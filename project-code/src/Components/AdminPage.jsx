import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase'; // Firestore and auth import
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [advices, setAdvices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminPrivileges = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error('No user is logged in.');
                }

                // Fetch the user's document from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (!userDocSnap.exists()) {
                    throw new Error('User document does not exist.');
                }

                const userData = userDocSnap.data();

                // Check if the username indicates admin privileges
                if (userData.username === 'kris.admin') {
                    setIsAdmin(true);
                } else {
                    throw new Error('Access denied. Admin privileges required.');
                }
            } catch (err) {
                console.error('Error checking admin privileges:', err.message);
                alert(err.message);
                navigate('/'); // Redirect to home if not an admin
            }
        };

        checkAdminPrivileges();
    }, [navigate]);

    useEffect(() => {
        if (!isAdmin) return; // Don't fetch advices if the user is not an admin

        const fetchAdvices = async () => {
            setLoading(true);
            setError('');
            try {
                const adviceCollection = collection(db, 'advices'); // Get all documents in the 'advices' collection
                const adviceSnapshot = await getDocs(adviceCollection);
                const adviceList = adviceSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setAdvices(adviceList); // Store all advices in the state
            } catch (err) {
                console.error('Error fetching advices:', err);
                setError('Failed to load advices. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdvices();
    }, [isAdmin]);

    const handleStatusChange = async (adviceId, currentStatus) => {
        if (!auth.currentUser) {
            alert('You must be logged in as an admin to perform this action.');
            return;
        }

        try {
            const adviceDoc = doc(db, 'advices', adviceId);
            const newStatus = currentStatus === 'approved' ? 'not-approved' : 'approved';

            // Get admin details
            const adminUsername = 'kris.admin';

            // Update the status and admin information in Firestore
            await updateDoc(adviceDoc, {
                status: newStatus,
                approvedBy: newStatus === 'approved' ? adminUsername : '', // Store adminUsername when approved
                approvedDate: newStatus === 'approved' ? new Date() : null, // Store timestamp for approval
            });

            // Update state for immediate UI feedback
            setAdvices((prevAdvices) =>
                prevAdvices.map((advice) =>
                    advice.id === adviceId
                        ? {
                            ...advice,
                            status: newStatus,
                            approvedBy: newStatus === 'approved' ? adminUsername : '',
                            approvedDate: newStatus === 'approved' ? new Date() : null,
                        }
                        : advice
                )
            );

            alert(`Advice status updated to '${newStatus}'`);
        } catch (error) {
            console.error('Error updating advice status:', error);
            alert('Failed to update advice status. Please try again.');
        }
    };

    if (!isAdmin) {
        return <div>Loading admin privileges...</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-container">
                <h1 className="admin-heading">Admin Dashboard</h1>
                <p className="admin-subheading">Manage Advice Approvals</p>

                {loading ? (
                    <p className="loading-text">Loading advices...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : advices.length === 0 ? (
                    <p className="no-advices">No advices found.</p>
                ) : (
                    <table className="advice-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Advice</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Approved by</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {advices.map((advice) => (
                                <tr key={advice.id}>
                                    <td>{advice.id}</td>
                                    <td>{advice.advice}</td>
                                    <td>{advice.Categories || 'N/A'}</td>
                                    <td>{advice.status || 'not-approved'}</td>
                                    <td>{advice.approvedBy || 'N/A'}</td>
                                    <td>
                                        <button
                                            className={`status-btn ${advice.status === 'approved' ? 'btn-approved' : 'btn-not-approved'
                                                }`}
                                            onClick={() => handleStatusChange(advice.id, advice.status)}
                                        >
                                            {advice.status === 'approved' ? 'Revoke Approval' : 'Approve'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminPage;

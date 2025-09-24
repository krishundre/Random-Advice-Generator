import React, { useState, useEffect } from 'react';
import './Advices.css';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { MdSkipNext, MdReport } from 'react-icons/md';
import { FaShareAlt, FaPlus } from 'react-icons/fa';
import Switch from 'react-switch';
import { toPng } from 'html-to-image';
import bgforShare from '../Assets/SignUp_LogIn_BG.png';
import bgforSharewithLogo from '../Assets/Logo.png';
import toast, { Toaster } from 'react-hot-toast';

const questions = [
  "How do you typically handle stress?",
  "What's your approach to decision-making?",
  "How do you prefer to interact with others?",
  "What motivates you the most?",
  "How do you deal with change?"
];

const Advices = () => {
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState(null);
  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [autoFetch, setAutoFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch advice from Firestore
  const fetchAdvice = async () => {
    try {
      setLoading(true);
      const adviceCollection = collection(db, 'advices');
      const approvedAdviceQuery = query(adviceCollection, where('status', '==', 'approved'));
      const adviceSnapshot = await getDocs(approvedAdviceQuery);
      const adviceList = adviceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (adviceList.length === 0) {
        setAdvice('No advice available.');
        setAdviceId(null);
        return;
      }

      const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];
      setAdvice(randomAdvice.advice);
      setAdviceId(randomAdvice.id);
      setReactions(randomAdvice.reactions || {});

      // Check if the user has reacted to this advice
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const previousReaction = userData.reactedAdvices?.find(
          (reaction) => reaction.adviceId === randomAdvice.id
        );

        // Set the user's previous reaction
        setUserReaction(previousReaction?.reaction || null);
      }
    } catch (error) {
      console.error('Error fetching advice:', error);
    } finally {
      setLoading(false);
    }
  };


  // Update reactions in Firestore and track reacted advice
  const updateReaction = async (newReaction) => {
    if (!adviceId || !user) {
      toast.error('You must be logged in to react.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid); // Reference to the current user's document
      const adviceDocRef = doc(db, 'advices', adviceId); // Reference to the advice document

      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();

      // Check if the user has already reacted to this advice
      const previousReaction = userData.reactedAdvices?.find(
        (reaction) => reaction.adviceId === adviceId
      );

      const updatedReactions = { ...reactions }; // Clone the current reactions

      // If the user has reacted before, decrement the previous reaction count
      if (previousReaction) {
        updatedReactions[previousReaction.reaction] = Math.max(
          0,
          (updatedReactions[previousReaction.reaction] || 1) - 1
        );

        // Remove the previous reaction from the user's reactedAdvices array
        await updateDoc(userDocRef, {
          reactedAdvices: arrayRemove(previousReaction),
        });
      }

      // Increment the count for the new reaction
      updatedReactions[newReaction] = (updatedReactions[newReaction] || 0) + 1;

      // Update the advice document with the new reactions
      await updateDoc(adviceDocRef, { reactions: updatedReactions });

      // Add the new reaction to the user's reactedAdvices array
      await updateDoc(userDocRef, {
        reactedAdvices: arrayUnion({
          adviceId,
          reaction: newReaction,
        }),
      });

      // Update the state for immediate UI feedback
      setReactions(updatedReactions);
      setUserReaction(newReaction);

      toast.success('Your reaction has been updated!');
    } catch (error) {
      console.error('Error updating reaction:', error);
      toast.error('Failed to update reaction. Please try again.');
    }
  };



  // Generate and share an image of the advice
  const handleShare = () => {
    const sectionToCapture = document.querySelector('.advice-text');
    if (!sectionToCapture) return;

    toPng(sectionToCapture, { cacheBust: true })
      .then((dataUrl) => {
        const adviceImage = new Image();
        adviceImage.src = dataUrl;
        toast.success('Image Downloaded')

        adviceImage.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set canvas dimensions
          canvas.width = 1280;
          canvas.height = 720;

          // Load and draw the background image
          const backgroundImage = new Image();
          backgroundImage.src = bgforShare; // Replace with the path to your background image
          backgroundImage.onload = () => {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Cover the entire canvas

            // Draw the advice text image on top
            const adviceX = (canvas.width - adviceImage.width) / 2;
            const adviceY = (canvas.height - adviceImage.height) / 2;
            ctx.drawImage(adviceImage, adviceX, adviceY);

            // Load and draw the logo
            const logoImage = new Image();
            logoImage.src = bgforSharewithLogo; // Replace with the path to your logo
            logoImage.onload = () => {
              const logoHeight = 100; // Adjust logo height
              const logoWidth = (logoImage.width / logoImage.height) * logoHeight;

              const logoX = (canvas.width - logoWidth) / 2; // Center horizontally
              const logoY = canvas.height - logoHeight - 10; // Position above the bottom
              ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

              // Generate and download the final image
              const finalDataUrl = canvas.toDataURL();
              const link = document.createElement('a');
              link.download = 'AdvicesbyRandomlyRight.png';
              link.href = finalDataUrl;
              link.click();
            };

            logoImage.onerror = () => {
              console.error('Error loading logo image.');
            };
          };

          backgroundImage.onerror = () => {
            console.error('Error loading background image.');
          };
        };

        adviceImage.onerror = () => {
          console.error('Error loading generated advice image.');
        };
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };


  useEffect(() => {
    fetchAdvice();

    let interval;
    if (autoFetch) {
      interval = setInterval(fetchAdvice, 10000);
    }
    return () => clearInterval(interval);
  }, [autoFetch]);

  return (
    <div className="main-page">
      <div className="advice-container">
        {loading ? (
          <p className="advice-text">Loading advice...</p>
        ) : (
          <p className="advice-text">{advice}</p>
        )}

        <div className="reaction-panel">
          {['smile', 'thumbsUp', 'heart', 'laugh', 'wow'].map((reaction) => (
            <button
              key={reaction}
              className={`reaction-btn ${userReaction === reaction ? 'active' : ''}`}
              onClick={() => updateReaction(reaction)}
            >
              {reaction === 'smile' && '😊'}
              {reaction === 'thumbsUp' && '👍'}
              {reaction === 'heart' && '❤️'}
              {reaction === 'laugh' && '😂'}
              {reaction === 'wow' && '😮'}
              {reactions[reaction] || 0}
            </button>
          ))}
        </div>
        <Toaster />
        <div className="button-container1">
          <button className="next-btn" onClick={fetchAdvice}>
            <MdSkipNext />
          </button>
          <button className="btn btn-share" onClick={handleShare}>
            <FaShareAlt />
          </button>
        </div>

        <div className="button-container2">
          <a className="btn btn-add-advice" href="/add-advice">
            Add Advice <FaPlus />
          </a>
          <a className="btn btn-danger report-btn" href='/contact'>
            Report <MdReport className="fs-4 ms-1" />
          </a>
        </div>

        <div className="auto-refresh">
          <label>
            <Switch
              onChange={setAutoFetch}
              checked={autoFetch}
              offColor="#3A3A3D"
              onColor="#E16A20"
              checkedIcon={false}
              uncheckedIcon={false}
              className="react-switch"
              height={20}
              width={48}
            />
            <span>Auto-refresh advice</span>
          </label>
        </div>
      </div>
    </div >
  );
};

export default Advices;

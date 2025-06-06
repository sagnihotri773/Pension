// import { Modal, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { hidePopup } from '../../redux/features/popupSlice';
// import { useDispatch, useSelector } from 'react-redux';
// // import AfterLoginPopup from './AfterLoginPopup';
// import "./afterLoginPopup.css";


// export default function DynamicPopup({ children, popupName, className, isFormValid, classBody = '', closeButton = true }) {
//     // const [show, setShow] = useState(true);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { show, type, content, name } = useSelector((state) => state.popup);


//     const handleClose = () => {
//         if (popupName === "recruiterAfterLogin" && !isFormValid) {
//             return; // Don't close if form is not valid
//         }

//         // if (popupName === "afterLogin" || popupName === "dashboardPopup") {
//         //     localStorage.setItem("homePopupSeen", 1)
//         //     dispatch(hidePopup())
//         // }
//         if (popupName === "appTracking") {
//             return;
//         }


//         dispatch(hidePopup())
//     };

//     const getSize = () => {
//         if (name === 'appTracking') {
//             return 'lg';
//         } else if (['company-account-setup', 'CreateAtsForm'].includes(name)) {
//             return 'lg p-4 Ats-form';
//         }
//         else if (name === 'sendOffer') {
//             return 'md';
//         } return 'lg';
//     }
//     return (
//         <Modal
//             show={name == popupName}
//             onHide={handleClose}
//             centered size={getSize()}
//             className={`welcome-slider-main ${className}`}
//             backdrop="static"
//             // backdrop={popupName === "recruiterAfterLogin" && !isFormValid ? "static" : true} // Disable outside click
//             keyboard={popupName === "recruiterAfterLogin" && !isFormValid ? false : true} // Disable Esc key
//         >

//             {
//                 (popupName !== "appTracking" && popupName !== "recruiterAfterLogin") &&
//                 <Modal.Header className='border-bottom-0' closeButton={closeButton} onClick={handleClose}>
//                 </Modal.Header>
//             }
//             <Modal.Body className={classBody}>
//                 <div>
//                     {/* {firstPopup()} */}
//                     {children}
//                 </div>
//             </Modal.Body>
//         </Modal >
//     )
// }

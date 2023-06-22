import React from 'react';

const Modal = ({post, closeHandler, confirmDeleteHandler}) => {
  return (
    <div className="modal d-block" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{post?.title}</h5>
            <button
              onClick={() => closeHandler()}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">

            </button>
          </div>
          <div className="modal-body">
            <p>Are You want to sure delete the post.</p>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => closeHandler()}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
            <button onClick={() => confirmDeleteHandler()} type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

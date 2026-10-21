import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  updateUser,
} from "../Redux/Actions/UsersActions";

const ROLES = ["Patient", "Biologiste", "Admin", "SubAdmin"];

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.UsersReducer?.user);
  const allUsers = useSelector((state) => state.UsersReducer?.allUsers || []);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    role: "Patient",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEditClick = (u) => {
    setSelectedUser(u);
    setEditData({
      name: u.name || "",
      email: u.email || "",
      phone: u.phone || "",
      secondaryPhone: u.secondaryPhone || "",
      role: u.role || "Patient",
    });
    setShowModal(true);
  };

  const handleChange = (field) => (e) =>
    setEditData({ ...editData, [field]: e.target.value });

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    await dispatch(updateUser(selectedUser._id, editData));
    setSelectedUser(null);
    setShowModal(false);
  };

  if (user && user.role !== "Admin" && user.role !== "SubAdmin" ) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger" role="alert">
          <h3>🚫 Not Allowed</h3>
          <p>This page is reserved for administrators (Admin) only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">👑 Admin Dashboard</h2>
        <span className="badge bg-primary fs-6">
          Total Users: {allUsers.length}
        </span>
      </div>

      {allUsers.length === 0 ? (
        <div className="alert alert-info text-center">No users available</div>
      ) : (
        <div className="row">
          {allUsers.map((u) => (
            <div className="col-md-4 col-sm-6 mb-4" key={u._id}>
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title fw-bold text-dark mb-0">
                      {u.name || "No Name"}
                    </h5>
                    <span
                      className={`badge ${
                        u.role === "Admin" ? "bg-danger" : "bg-secondary"
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>

                  <hr />

                  <p className="card-text mb-1 text-muted">
                    <strong>📧 Email:</strong> {u.email}
                  </p>
                  <p className="card-text mb-1 text-muted">
                    <strong>📞 Phone:</strong> {u.phone || "Not Available"}
                  </p>
                  {u.secondaryPhone && (
                    <p className="card-text mb-1 text-muted">
                      <strong>📱 Sec Phone:</strong> {u.secondaryPhone}
                    </p>
                  )}

                  <div className="mt-auto pt-3 d-flex justify-content-between gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm w-100 fw-bold"
                      onClick={() => handleEditClick(u)}
                    >
                      ✏️ Update
                    </button>
                    {
                      user.role == 'Admin' && 
                      <button
                      type="button"
                      className="btn btn-outline-danger btn-sm w-100 fw-bold"
                      onClick={() => handleDelete(u._id)}
                      disabled={user && u._id === user._id}
                    >
                      🗑️ Delete
                    </button>
                    }
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-warning text-dark">
                  <h5 className="modal-title fw-bold">Edit User Data</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <form onSubmit={handleUpdateSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="edit-name" className="form-label fw-bold">
                        Name
                      </label>
                      <input
                        id="edit-name"
                        name="name"
                        type="text"
                        className="form-control"
                        value={editData.name}
                        onChange={handleChange("name")}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="edit-email"
                        className="form-label fw-bold"
                      >
                        Email
                      </label>
                      <input
                        id="edit-email"
                        name="email"
                        type="email"
                        className="form-control"
                        value={editData.email}
                        onChange={handleChange("email")}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="edit-phone"
                        className="form-label fw-bold"
                      >
                        Phone
                      </label>
                      <input
                        id="edit-phone"
                        name="phone"
                        type="text"
                        className="form-control"
                        value={editData.phone}
                        onChange={handleChange("phone")}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="edit-secondaryPhone"
                        className="form-label fw-bold"
                      >
                        Secondary Phone
                      </label>
                      <input
                        id="edit-secondaryPhone"
                        name="secondaryPhone"
                        type="text"
                        className="form-control"
                        value={editData.secondaryPhone}
                        onChange={handleChange("secondaryPhone")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edit-role" className="form-label fw-bold">
                        Role
                      </label>
                      <select
                        id="edit-role"
                        name="role"
                        className="form-select"
                        value={editData.role}
                        onChange={handleChange("role")}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning fw-bold">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

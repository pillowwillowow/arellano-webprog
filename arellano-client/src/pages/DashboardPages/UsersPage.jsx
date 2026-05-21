  import { useState, useEffect} from "react";
  import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
  } from "@mui/material";
  import { useTheme } from "@mui/material/styles";
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
  import { DataGrid } from "@mui/x-data-grid";
  import { useNavigate } from "react-router-dom";
  import { fetchUsers, createUser, updateUser } from "../../services/UserService";
  import AddCircleIcon from "@mui/icons-material/AddCircle";


  const roles = ['admin', 'editor', 'viewer'];
  const genders = ['male', 'female', 'other'];

  const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: '',
    userName: '',
    password: '',
    address: '',
    isActive: true,
  };

  const labelize = (value) => 
    value ? `${value[0].toUpperCase()}${value.slice(1)}` : '';

  const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({}); 
    const [showPassword, setShowPassword] = useState(false);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();
      useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!user) {
          navigate("/");
          return;
        }

        setLoggedInUser(user);

        if (user.role !== "admin") {
          navigate("/dashboard", { replace: true });
        }
      }, [navigate]);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const { data } = await fetchUsers();

        const formattedUsers =
          (data?.users || []).map((user, index) => ({
          id: user._id?.toString() || user.id,
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          age: user.age ?? "",
          gender: user.gender ?? "",
          contactNumber: user.contactNumber ?? "",
          email: user.email ?? "",
          role: user.role ?? "",
          userName: user.userName ?? "",
          password: user.password ?? "",
          address: user.address ?? "",
          isActive:
            typeof user.isActive === "boolean"
              ? user.isActive
              : true,
        }));

      setUsers(formattedUsers);

    } catch (error) {
      console.error(error);
      setLoadError("Error loading users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadUsers();
}, []);

  const normalizedSearch = search.toLowerCase().trim();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(normalizedSearch) ||
      user.lastName?.toLowerCase().includes(normalizedSearch) ||
      user.email?.toLowerCase().includes(normalizedSearch) ||
      user.userName?.toLowerCase().includes(normalizedSearch);

    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesGender = genderFilter ? user.gender === genderFilter : true;

    const matchesStatus =
      statusFilter === "active"
        ? user.isActive
        : statusFilter === "inactive"
        ? !user.isActive
        : true;

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

    const resetForm = () => {
      setForm({ ...blankForm });
      setErrors({});
    };

    const handleEdit = (user) => {
      console.log("EDIT USER:", user);

      setForm({
        ...user,
        password: "",
      });

      setEditUserId(user.id);
      setIsEditing(true);
      setErrors({});
      setOpen(true);
    };

    const openAddModal = () => {
    setForm(blankForm);
    setIsEditing(false);
    setEditUserId(null);
    setOpen(true);
  };

    const closeModal = () => {
      setOpen(false);
      setIsEditing(false);
      setEditUserId(null);
      setShowPassword(false);
      resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const validate = () => {
      const nextErrors = {};
      const email = String(form.email || "").trim().toLowerCase();
      const userName = String(form.userName || "").trim();

      [
        ['firstName', 'First Name'],
        ['lastName', 'Last Name'],
        ['age', 'Age'],
        ['gender', 'Gender'],
        ['contactNumber', 'Contact Number'],
        ['email', 'Email'],
        ['role', 'Role'],
        ['userName', 'Username'],
        ['address', 'Address'],
      ].forEach(([key, label]) => {
        if (!form[key] || String(form[key]).trim() === '') {
          nextErrors[key] = `${label} is required.`;
        }
      });
      if (!isEditing && !form.password.trim()) {
        nextErrors.password = "Password is required.";
      }

      if (
        !nextErrors.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        nextErrors.email = 'Enter a valid email address.';
      }

      if (
        !nextErrors.email &&
        users.some(
          (user) =>
             user.id !== editUserId &&
            user.email.trim().toLowerCase() === email
        )
      ) {
        nextErrors.email = 'Email already exists.';
      }
      if (
        !nextErrors.userName &&
        users.some(
          (user) =>
             user.id !== editUserId &&
            user.userName.trim().toLowerCase() === userName.toLowerCase()
        )
      ) {
        nextErrors.userName = 'Username already exists.';
      }

      // PASSWORD: at least 8 characters
        if (!isEditing) {
          if (!form.password || form.password.trim().length < 8) {
            nextErrors.password = 'Password must be at least 8 characters.';
          }
        }

        // During edit, password is optional
        if (
          isEditing &&
          form.password &&
          form.password.trim() !== "" &&
          form.password.trim().length < 8
        ) {
          nextErrors.password =
            'Password must be at least 8 characters.';
        }
      // CONTACT NUMBER: must be exactly 11 digits
      if (
        !nextErrors.contactNumber &&
        !/^\d{11}$/.test(form.contactNumber.trim())
      ) {
        nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
      }

      // AGE: numbers only
      if (!/^\d+$/.test(String(form.age || "").trim())) {
        nextErrors.age = "Age must be a number only.";
      }

      // USERNAME: no spaces allowed
      if (
        !nextErrors.userName &&
        /\s/.test(form.userName)
      ) {
        nextErrors.userName = 'Username must not contain spaces.';
      }

      return nextErrors;
    };

    {/* Enhancement 3: Based on the UsersPage when adding users make the SignUp working. | DONE */}
    const handleSaveUser = async (event) => {
      event.preventDefault();

      const nextErrors = validate();

      if (Object.keys(nextErrors).length) {
        setErrors(nextErrors);
        return;
      }

      const userData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: String(form.age || "").trim(),
        gender: form.gender.trim(),
        contactNumber: String(form.contactNumber || "").trim(),
        email: String(form.email || "").trim(),
        role: form.role.trim(),
        userName: String(form.userName || "").trim(),
        address: form.address.trim(),
        isActive: form.isActive,
      };

      // ONLY add password if user typed one
      if (form.password && form.password.trim() !== "") {
        userData.password = form.password.trim();
      }

      try {
        if (isEditing) {
          await updateUser(editUserId, userData);
        } else {
          await createUser(userData);
        }

        await loadUsers();
        closeModal();

      } catch (error) {
        console.error("Error saving user:", error.response?.data);

        alert(
          error.response?.data?.message ||
          "Failed to save user"
        );
      }
    };
    const handleToggleActive = async (id, isActive) => {
      try {

        await updateUser(id, {
          isActive: !isActive,
        });

        await loadUsers();

      } catch (error) {
        console.error("Error toggling status:", error);
      }
    };

    const fieldProps = (name, label, extra = {}) => ({
      name,
      label,
      value: form[name] ?? "",
      onChange: handleChange,
      error: Boolean(errors[name]),
      helperText: errors[name],
      fullWidth: true,
      ...extra,
    });

    const columns = [
      {field: 'id', headerName: 'ID', width: 80},
      {
        field: 'fullName',
        headerName: 'Full Name',
        flex: 1,
        minWidth: 170,
      valueGetter: (value, row) => `${row?.firstName ?? ""} ${row?.lastName ?? ""}`
      },

      {field: 'userName', headerName: 'Username', minWidth: 150},
      {field: 'age', headerName: 'Age', minWidth: 90},
      {
        field: 'gender',
        headerName: 'Gender',
        minWidth: 110,
        valueGetter: (value, row) => labelize(row.gender)
      },

      {
        field: 'contactNumber',
        headerName: 'Contact Number',
        minWidth: 110,
        valueGetter: (value, row) => labelize(row.contactNumber)
      },
      {field: 'email', 
        headerName: 'Email Address', 
        minWidth: 200,
        valueGetter: (value, row) => row.email || "N/A",
      },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: (params) => {
        const isActive = params.row.isActive;

        if (loggedInUser === null) {
        return null;
    }

            return (
              <Chip
                size="small"
                label={isActive ? "Active" : "Inactive"}
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  px: 1,

                  backgroundColor: isActive ? "#e6f4ea" : "#f3f3f3",
                  color: isActive ? "#1b5e20" : "#555",

                  border: isActive ? "1px solid #6B8754" : "1px solid #ddd",
                }}
              />
            );
          },
        },
        {
          field: 'actions',
          headerName: 'Actions',
          minWidth: 220,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
            <Stack direction='row' spacing={1} sx={{ py: 0.5}}>
              <Button size="small" variant="outlined" 
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontSize: "14px",
                px: 2,
                color: "#13220d",
                border: "3px solid #e48c9d"
              }}
              onClick={() => handleEdit(params.row)}>
                Edit
              </Button>
              <Button 
                size="small"
                variant="contained" 
                color={params.row.isActive ? 'error' : 'success'} 
                onClick={() =>
                handleToggleActive(
                  params.row.id,
                  params.row.isActive
                )
              }
              >
                {params.row.isActive ? 'Deactivate' : 'Activate'}
              </Button>
            </Stack>
          ),
        },
      ];

      return (
        <Box sx={{ width: '100%', minWidth: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4" sx={{ py: 2, fontFamily: "'Lexend', sans-serif", fontWeight: 600, color: '#13220d' }}>
            Users ˘͈ᵕ˘͈⸝*
          </Typography>
          <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={openAddModal}
            sx={{
              fontSize: '18px',
              fontWeight: 700,
              fontFamily: "'Lexend', sans-serif",
              textTransform: 'none',
              px: 3,
              py: 1,
              borderRadius: 3,
              width: { xs: '100%', sm: 'auto' },

              background: "#e48c9d",

              color: '#13220d',

              transition: 'all 0.2s ease',
              '&:hover': {
              transform: 'translateY(-1px)',
            },

            '&:active': {
              transform: 'scale(0.98)',
                    },
                  }}
                >
            Add User
          </Button>
        </Box>    

      {loadError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loadError}
        </Alert>
      )}

      <Paper sx={{ background: "#6B8754", borderRadius: 4, p: {xs: 1.5, sm: 2}, minWidth: 0, overflowX: 'hidden' }}>
        {users.length ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 2 }}
              >
                {/* SEARCH */}
                <TextField
                  size="small"
                  label="Search users" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ flex: 1, background: "#ffffff"}}
                />

                {/* ROLE FILTER */}
                <TextField
                  select
                  size="small"
                  label="Role"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  sx={{ width: 140, background: "#ffffff"}}
                >
                  <MenuItem value="">All</MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>

                {/* GENDER FILTER */}
                <TextField
                  select
                  size="small"
                  label="Gender"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  sx={{ width: 140, background: "#ffffff"}}
                >
                  <MenuItem value="">All</MenuItem>
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>
                      {labelize(g)}
                    </MenuItem>
                  ))}
                </TextField>

                {/* STATUS FILTER */}
                <TextField
                  select
                  size="small"
                  label="Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ width: 140, background: "#ffffff" }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Stack>
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5, page: 0 } },
                }}
                sx={{
                  minWidth: 0,
                  '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                    outline: 'none',
                  },
                }}
              />
            </Box>
          ) : (
            <Alert severity="info">
              No users found. Use Add User to create your first record.
            </Alert>
          )}
        </Paper>

        <Dialog 
        open={open}
        onClose={closeModal} 
        fullWidth 
        fullScreen={isMobile}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          },
        }}
      >
        <Box component="form" onSubmit={handleSaveUser}>
          <DialogTitle 
            sx={{
            background: "#1f3a18",
            color: "#e48c9d ",
            fontFamily: "'Lexend', sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            py: 2,
          }}> 
          {isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent 
            sx={{
              px: { xs: 2, sm: 3 },
              py: 3,
              background: "#A3B18A",
            }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('firstName', 'First Name')}
                  sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: 2,
                },
              }}/>
              <TextField {...fieldProps('lastName', 'Last Name')} 
                  sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: 2,
                },
              }}/>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('age', 'Age')} 
                  sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: 2,
                },
              }}/>
              <TextField {...fieldProps('gender', 'Gender', { select: true })}  
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                  },
                }}>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('contactNumber', 'Contact Number')} 
                    sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  }} />
              <TextField {...fieldProps('email', 'Email Address', {type: 'email'})} 
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                  },
                }}/>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row'}} spacing={2}>
              <TextField
                {...fieldProps('role', 'Role', { select: true })}
                  sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                  },
                }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </TextField>
                <TextField {...fieldProps('userName', 'Username')} 
                  sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                  },
                }} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  },
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
            <TextField
              {...fieldProps('address', 'Address', {multiline: true, minRows: 2})}
                  sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                  },
                }}
             />  
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />
              }
              label={form.isActive ? "Active" : "Inactive"}
            />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, }}>
            <Button sx={{color: "#1f3a18", fontWeight: "600"}} onClick={closeModal}>Cancel</Button>
            <Button 
              type="submit"
              variant="contained"
              sx={{
                background: "#13220d",
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                "&:hover": { background: "#1f3a18" },
              }}>
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      </Box>
    );
  };

  export default UsersPage;
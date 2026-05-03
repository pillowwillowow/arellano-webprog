  import { useState } from "react";
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
  import usersSeed from "../../data/users.json";

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

  const loadUsers = () => {
    try {
      return {
        users: usersSeed.map((user, index) => ({ 
          id: Number(user.id) || index + 1,
          firstName: String(user.firstName ?? '').trim(),
          lastName: String(user.lastName ?? '').trim(),
          age: String(user.age ?? '').trim(),
          gender: genders.includes(String(user.gender ?? '').toLowerCase())
            ? String(user.gender ?? '').trim().toLowerCase()
            : '',
          contactNumber: String(user.contactNumber ?? '').trim(),
          email: String(user.email ?? '').trim(),
          role: roles.includes(String(user.role ?? '').toLowerCase())
            ? String(user.role ?? '').trim().toLowerCase()
            : '',
          userName: String(user.username ?? '').trim(),
          contactNumber: user.contactNumber ? String(user.contactNumber).trim() : "",
          password: String(user.password ?? '').trim(),
          address: String(user.address ?? '').trim(),
          isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
        })),
        error: '',
      };
    } catch (error) {
      return {
        users: [],
        error: 'Unable to read users from src/assets/users.json.',
      };
    }
  };

  const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { users: initialUsers, error: loadError } = loadUsers();
    const [users, setUsers] = useState(initialUsers);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({}); 
    const [showPassword, setShowPassword] = useState(false);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    
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

    const openAddModal = (user = null) => {
      setModal({
        open: true,
        id: user ? user.id : null,
      });

      setForm(user ? { ...blankForm, ...user } : blankForm);
      setErrors({});
    };

    const closeModal = () => {
      setModal({ open: false, id: null });
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
      const email = form.email.trim().toLowerCase();
      const userName = form.userName.trim();

      [
        ['firstName', 'First Name'],
        ['lastName', 'Last Name'],
        ['age', 'Age'],
        ['gender', 'Gender'],
        ['contactNumber', 'Contact Number'],
        ['email', 'Email'],
        ['role', 'Role'],
        ['userName', 'Username'],
        ['password', 'Password'],
        ['address', 'Address'],
      ].forEach(([key, label]) => {
        if (!form[key] || String(form[key]).trim() === '') {
          nextErrors[key] = `${label} is required.`;
        }
      });

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
            user.id !== modal.id &&
            user.email.trim().toLowerCase() === email
        )
      ) {
        nextErrors.email = 'Email already exists.';
      }
      if (
        !nextErrors.userName &&
        users.some(
          (user) =>
            user.id !== modal.id &&
            user.userName.trim().toLowerCase() === userName.toLowerCase()
        )
      ) {
        nextErrors.userName = 'Username already exists.';
      }

    {/* Enhancement 3: Improve form validation with beginner-friendly rules | DONE */}

      // PASSWORD: at least 8 characters
      if (!nextErrors.password && form.password.trim().length < 8) {
        nextErrors.password = 'Password must be at least 8 characters.';
      }

      // CONTACT NUMBER: must be exactly 11 digits
      if (
        !nextErrors.contactNumber &&
        !/^\d{11}$/.test(form.contactNumber.trim())
      ) {
        nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
      }

      // AGE: numbers only
      if (
        !nextErrors.age &&
        !/^\d+$/.test(form.age.trim())
      ) {
        nextErrors.age = 'Age must be a number only.';
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

    const handleSubmit = (event) => {
      event.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length) {
          setErrors(nextErrors);
          return;
        }

      const nextUser = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender.trim(),
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim(),
        role: form.role.trim(),
        userName: form.userName.trim(),
        password: form.password.trim(),
        address: form.address.trim(),
        isActive: form.isActive,
      };

      setUsers((prev) => 
        modal.id
          ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
          : [
              ...prev,
              { 
                id: prev.reduce((max, user) => Math.max(max, user.id), 0) + 1, 
                ...nextUser,
              },
            ]
        );

      closeModal ();
    };

    const toggleStatus = (id) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isActive: !user.isActive } : user
        )
      );
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
          onClick={() => openAddModal(params.row)}>
              Edit
            </Button>
            <Button 
              size="small"
              variant="contained" 
              color={params.row.isActive ? 'error' : 'success'} 
              onClick={() => toggleStatus(params.row.id)}
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
            variant="contained"
            onClick={openAddModal}
            sx={{
              fontSize: '18px',
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
            + Add User
          </Button>
        </Box>    

      {loadError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loadError}
        </Alert>
      )}

       {/*Enhancement 2: Create and design a search and filter. | DONE */}

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
        open={modal.open} 
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

        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle 
            sx={{
            background: "#1f3a18",
            color: "#e48c9d ",
            fontFamily: "'Lexend', sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            py: 2,
          }}> 
          {modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
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
              {modal.id ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      </Box>
    );
  };

  export default UsersPage;
import { useEffect, useState } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../data/users.json";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "",
  userName: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value[0].toUpperCase()}${value.slice(1)}` : "";

const UsersPage = () => {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [form, setForm] = useState(blankForm);

  // Load users
  useEffect(() => {
    const mapped = usersSeed.map((u, i) => ({
      id: u.id || i + 1,
      ...u,
      isActive: u.isActive ?? true,
    }));
    setUsers(mapped);
  }, []);

  const openAdd = () => {
    setForm(blankForm);
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setForm(user);
    setEditingId(user.id);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSave = () => {
  if (editingId) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingId
          ? { ...u, ...form, id: editingId }
          : u
      )
    );
  } else {
    setUsers((prev) => [
      ...prev,
      {
        ...form,
        id: prev.length
          ? Math.max(...prev.map((u) => u.id)) + 1
          : 1,
      },
    ]);
  }

  setModalOpen(false);
};

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, isActive: !u.isActive } : u
      )
    );
  };

  // FILTERS
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter ? u.role === roleFilter : true;
    const matchGender = genderFilter ? u.gender === genderFilter : true;
    const matchStatus =
      statusFilter === "active"
        ? u.isActive
        : statusFilter === "inactive"
        ? !u.isActive
        : true;

    return matchSearch && matchRole && matchGender && matchStatus;
  });

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "age", headerName: "Age", width: 90 },
    {
      field: "gender",
      headerName: "Gender",
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: "email", headerName: "Email", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? "Active" : "Inactive"}
          color={params.row.isActive ? "success" : "default"}
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => openEdit(params.row)}>
            Edit
          </Button>
          <Button
            size="small"
            color={params.row.isActive ? "error" : "success"}
            onClick={() => toggleStatus(params.row.id)}
          >
            {params.row.isActive ? "Disable" : "Enable"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={openAdd}>
          Add User
        </Button>
      </Stack>

      {/* FILTERS */}
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

      {/* MODAL */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
        <DialogTitle>
          {editingId ? "Edit User" : "Add User"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              name="firstName"
              label="First Name"
              value={form.firstName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="lastName"
              label="Last Name"
              value={form.lastName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
import { useEffect, useState } from 'react';
import { fetchArticles, updateArticle, createArticle } from '../../services/ArticleService';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  Paper
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TitleIcon from '@mui/icons-material/Title';
import ShortTextIcon from '@mui/icons-material/ShortText';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { DataGrid } from '@mui/x-data-grid';

const section = {
  borderTop: "2px solid #18181b",
  borderBottom: "2px solid #18181b",
  backgroundColor: "#fafafa",
  px: { xs: 2, sm: 3, md: 4 },
  py: 3,
};

const container = {
  width: "100%",
};

const card = {
  border: "2px solid #18181b",
  borderRadius: "24px",
  bgcolor: "#f4f4f5",
  p: 2,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: {
    xs: '90%',
    sm: 600,
    md: 700,
  },

  maxHeight: '90vh',
  overflowY: 'auto',

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArticle, setNewArticle] = useState({
    slug: '',
    title: '',
    content: '',
    featured: false,
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  const [search, setSearch] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);
      const {data} = await fetchArticles();
      setArticles(data?.articles ?? []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      `${a.slug} ${a.title} ${a.content}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFeatured = filterFeatured ? a.featured === (filterFeatured === 'featured') : true;

    const matchesStatus =
      filterStatus === ""
        ? true
        : filterStatus === "active"
        ? a.isActive
        : !a.isActive;

    return matchesSearch && matchesFeatured && matchesStatus;
  });

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({
      slug: '',
      title: '',
      content: '',
      featured: false,
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle({ ...articleToEdit });
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    };
  }

  const handleSaveArticle = async () => {
    if (!validate()) return;

    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateArticle(id, { isActive: !isActive });
      loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const inputField = (icon, props) => (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
      <Box sx={{ display: "flex", minWidth: 32, color: "text.secondary" }}>
        {icon}
      </Box>

      <TextField
        fullWidth
        size="small"
        {...props}
        error={!!errors[props.name]}
        helperText={errors[props.name]}
        onChange={(e) => {
          setNewArticle({ ...newArticle, [props.name]: e.target.value });

          setErrors((prev) => ({ ...prev, [props.name]: "" }));

          props.onChange?.(e);
        }}
      />
    </Stack>
  );

  const validate = () => {
    const err = {};

    const slug = newArticle.slug?.trim() || "";
    const title = newArticle.title?.trim() || "";
    const content = newArticle.content?.trim() || "";

    if (!slug) err.slug = "Slug is required";
    else if (!/^[a-z0-9-]+$/.test(slug)) err.slug = "Slug must be lowercase, numbers, and hyphens only";

    if (!title) err.title = "Title is required";

    if (!content) err.content = "Content is required";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.45,
      minWidth: 70,
      valueGetter: (value) => value.slice(-6),
    },
    {
      field: "slug",
      headerName: "Slug",
      flex: 0.9,
      minWidth: 110,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1.2,
      minWidth: 140,
    },
    {
      field: "paragraphs",
      headerName: "Paragraphs",
      flex: 0.55,
      minWidth: 85,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => row.content.split("\n\n").length,
    },
    {
      field: "preview",
      headerName: "Preview",
      flex: 1.8,
      minWidth: 180,
      valueGetter: (value, row) =>
        row.content.length > 90
          ? row.content.substring(0, 90) + "..."
          : row.content,
    },
    {
      field: "featured",
      headerName: "Featured",
      flex: 0.55,
      minWidth: 85,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const featured = params.row.featured;

        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: "999px",
                fontSize: "0.7rem",
                fontWeight: 600,
                minWidth: 72,
                textAlign: "center",
                border: "1px solid",
                borderColor: featured ? "primary.dark" : "#18181b",
                bgcolor: featured ? "primary.dark" : "transparent",
                color: featured ? "#fff" : "#18181b",
                lineHeight: 2,
              }}
            >
              {featured ? "Featured" : "Standard"}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 0.6,
      minWidth: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isActive = params.row.isActive;

        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: "999px",
                fontSize: "0.7rem",
                fontWeight: 600,
                minWidth: 72,
                textAlign: "center",
                bgcolor: isActive ? "success.main" : "error.main",
                color: "#fff",
                lineHeight: 2,
              }}
            >
              {isActive ? "Active" : "Inactive"}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.9,
      minWidth: 145,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{ minWidth: 50, px: 1, backgroundColor: "#18181b" }}
            onClick={() => handleEdit(params.row._id)}
          >
            Edit
          </Button>

          <Switch
            checked={params.row.isActive}
            onChange={() =>
              handleToggleActive(params.row._id, params.row.isActive)
            }
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#18181b",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#18181b",
              },
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={section}>
        <Box sx={container}>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.75rem", md: "1.9rem" },
                fontWeight: 700,
                color: "#18181b",
                lineHeight: 1.1,
              }}
            >
              Articles
            </Typography>
            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleOpen} sx={{ width: { xs: '100%', sm: 'auto', backgroundColor: "#18181b"} }}>
              Add Article
            </Button>
          </Box>

          <Stack spacing={2} sx={{ mt: 3, pb: 3}}>
            <TextField
              size="small"
              label="Search articles"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                size="small"
                label="Featured"
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value)}
                fullWidth
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
              </TextField>

              <TextField
                select
                size="small"
                label="Status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Stack>
          </Stack>

          <Paper elevation={0} sx={card}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              getRowId={(row) => row._id}
              loading={loading}
              pageSizeOptions={[5, 10]}
              initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
                }}
              columnBuffer={10}
              disableRowSelectionOnClick
              sx={{
                border: "none",
                borderRadius: "18px",
                overflow: "hidden",
                fontSize: "0.78rem",

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#e4e4e7",
                },

                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e4e4e7",
                },

                "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
                  outline: "none",
                },
              }}
            />
          </Paper>

          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
              sx: {
                borderRadius: "24px",
                border: "2px solid #18181b",
                bgcolor: "#fafafa",
              },
            }}
          >
            <Box>
              <DialogTitle sx={{ fontWeight: 700 }}>
                {isEditing ? "Edit Article" : "Add Article"}
              </DialogTitle>

              <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
                <Stack spacing={2} sx={{ pt: 1 }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    {inputField(<ShortTextIcon />, {
                      name: "slug",
                      label: "Article Slug",
                      value: newArticle.slug,
                      onChange: (e) =>
                        setNewArticle({ ...newArticle, slug: e.target.value }),
                    })}

                    {inputField(<TitleIcon />, {
                      name: "title",
                      label: "Title",
                      value: newArticle.title,
                      onChange: (e) =>
                        setNewArticle({ ...newArticle, title: e.target.value }),
                    })}
                  </Stack>

                  {inputField(<ShortTextIcon />, {
                    name: "content",
                    label: "Content",
                    value: newArticle.content,
                    multiline: true,
                    rows: 6,
                    onChange: (e) =>
                      setNewArticle({ ...newArticle, content: e.target.value }),
                  })}

                  <Stack direction="column">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: 140,
                      }}
                    >
                      <Typography sx={{ minWidth: 80 }}>Featured:</Typography>
                      <Switch
                        checked={newArticle.featured}
                        onChange={(e) =>
                          setNewArticle({ ...newArticle, featured: e.target.checked })
                        }
                        sx={{
                          m: 0,
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#18181b",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#18181b",
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: 140,
                      }}
                    >
                      <Typography sx={{ minWidth: 80 }}>Status:</Typography>
                      <Switch
                        checked={newArticle.isActive}
                        onChange={(e) =>
                          setNewArticle({ ...newArticle, isActive: e.target.checked })
                        }
                        sx={{
                          m: 0,
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#18181b",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#18181b",
                          },
                        }}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </DialogContent>

              <DialogActions sx={{ px: 3, py: 2 }}>
                <Button variant="outlined" onClick={handleClose} sx={{ color: "#18181b", borderColor: "#18181b" }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSaveArticle} sx={{ backgroundColor: "#18181b" }}>
                  {isEditing ? 'Save Changes' : 'Add'}
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default DashArticleListPage;
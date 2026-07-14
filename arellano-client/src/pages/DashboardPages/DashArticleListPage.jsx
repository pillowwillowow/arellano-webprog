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
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import TitleIcon from "@mui/icons-material/Title";
import ShortTextIcon from "@mui/icons-material/ShortText";
import ArticleIcon from "@mui/icons-material/Article";

import {
  fetchArticles, createArticle, updateArticle,
} from "../../services/ArticleService";

const fairyGreen = "#6B8754";
const darkGreen = "#13220d";
const fairyPink = "#e48c9d";
const softBg = "#f8faf5";

const blankArticle = {
  slug: "",
  title: "",
  content: "",
  image: "",
  featured: false,
  isActive: true,
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);

  const [newArticle, setNewArticle] = useState(blankArticle);

  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);

{/* Enhancement 2: Base on UsersPage create a DashArticleListPage with this consideration:
• The articles will be available on ArticleListPage. | DONE */}

    const { data } = await fetchArticles();

    const formattedArticles = (data?.articles || []).map((article, index) => ({
      ...article,
      customId: `ELF-${index + 1}`,
    }));

        setArticles(formattedArticles);

      } catch (error) {
        console.error("Error loading articles:", error);
        setLoadError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      loadArticles();
    }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.slug?.toLowerCase().includes(search.toLowerCase()) ||
      article.title?.toLowerCase().includes(search.toLowerCase()) ||
      article.content?.toLowerCase().includes(search.toLowerCase());

    const matchesFeatured =
      filterFeatured === ""
        ? true
        : filterFeatured === "featured"
        ? article.featured
        : !article.featured;

    const matchesStatus =
      filterStatus === ""
        ? true
        : filterStatus === "active"
        ? article.isActive
        : !article.isActive;

    return matchesSearch && matchesFeatured && matchesStatus;
  });

  const handleOpen = () => {
    setIsEditing(false);
    setEditArticleId(null);
    setNewArticle(blankArticle);
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setNewArticle(blankArticle);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (article) => {
  setNewArticle({
    slug: article.slug || "",
    title: article.title || "",
    content: article.content || "",
    image: article.image || "",
    featured: article.featured || false,
    isActive:
      typeof article.isActive === "boolean"
        ? article.isActive
        : true,
  });

    setEditArticleId(article._id);
    setIsEditing(true);
    setOpen(true);
  };

   { /* HANDLE INPUT CHANGE - VALIDATION */ }
  const handleChange = ({ target: { name, value, checked, type } }) => {
    setNewArticle((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

{ /* VALIDATION */ }
 const validate = () => {
    const nextErrors = {};

    if (!newArticle.slug.trim()) {
      nextErrors.slug = "Slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(newArticle.slug.trim())) {
      nextErrors.slug =
        "Slug must contain lowercase letters, numbers, and hyphens only.";
    }

    if (!newArticle.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!newArticle.content.trim()) {
      nextErrors.content = "Content is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

 { /* SAVE ARTICLE */ }
  const handleSaveArticle = async () => {
    if (!newArticle.image.trim()) {
    nextErrors.image = "Image URL is required.";
  }

    try {
    const articleData = {
      slug: newArticle.slug.trim(),
      title: newArticle.title.trim(),
      content: newArticle.content.trim(),
      image: newArticle.image.trim(),
      featured: newArticle.featured,
      isActive: newArticle.isActive,
    };

      if (isEditing) {
        await updateArticle(editArticleId, articleData);
      } else {
        await createArticle(articleData);
      }

      await loadArticles();

      handleClose();
    } catch (error) {
      console.error("Error saving article:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to save article."
      );
    }
  };

  // TOGGLE ACTIVE
  const handleToggleActive = async (id, isActive) => {
    try {
      await updateArticle(id, {
        isActive: !isActive,
      });

      await loadArticles();
    } catch (error) {
      console.error("Error updating article status:", error);
    }
  };

  const columns = [
    {
      field: "customId",
      headerName: "Article ID",
      width: 140,
    },

    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 180,
    },

    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
      minWidth: 160,
    },

    {
      field: "image",
      headerName: "Image",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box
          component="img"
          src={params.row.image}
          alt={params.row.title}
          sx={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 2,
            my: 1,
          }}
        />
      ),
},

    {
      field: "featured",
      headerName: "Featured",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.row.featured ? "Featured" : "Standard"}
          size="small"
          sx={{
            backgroundColor: params.row.featured
              ? fairyPink
              : "#ececec",
            color: darkGreen,
            fontWeight: 600,
          }}
        />
      ),
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? "Active" : "Inactive"}
          size="small"
          sx={{
            backgroundColor: params.row.isActive
              ? "#d7f3dd"
              : "#ececec",
            color: darkGreen,
            fontWeight: 600,
          }}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEdit(params.row)}
            sx={{
              borderColor: fairyPink,
              color: darkGreen,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Edit
          </Button>

            <Switch
              checked={params.row.isActive}
              onChange={() =>
                handleToggleActive(
                  params.row._id,
                  params.row.isActive
                )
              }
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: fairyGreen,
                },

                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                  {
                    backgroundColor: fairyGreen,
                  },
              }}
            />
          </Stack>
        ),
      },
    ];

    return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
      <Box>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              color: darkGreen,
              fontFamily: "'Lexend', sans-serif",
            }}
          >
            𖧧 Fairy Articles ⚘.⋆˚࿔ ᭝ ᨳଓ ՟
          </Typography>

          <Typography
            sx={{
              color: "#181616",
              mt: 1,
              fontFamily: "'Lexend', sans-serif",
            }}
          >
            Create and manage magical forest stories.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{
            background: fairyPink,
            fontFamily: "'Lexend', sans-serif",
            fontSize: "20px",
            color: darkGreen,
            fontWeight: 700,
            textTransform: "none",
            py: 2,
            borderRadius: 3,

            "&:hover": {
              background: "#d97c90",
            },
          }}
        >
          Add Article
        </Button>
      </Box>

      {/* GREEN BOX */}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: fairyGreen,
          p: { xs: 2, md: 4 },
          borderRadius: 3,
        }}
      >

        {/* ERROR */}
        {loadError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {loadError}
          </Alert>
        )}

        {/* FILTERS */}
        <Paper
          sx={{
            mt: 3,
            p: 3,
            borderRadius: 5,
            border: `2px solid ${darkGreen}`,
            background: softBg,
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Search Articles"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <TextField
                select
                label="Featured"
                value={filterFeatured}
                onChange={(e) =>
                  setFilterFeatured(e.target.value)
                }
                fullWidth
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="featured">
                  Featured
                </MenuItem>
                <MenuItem value="standard">
                  Standard
                </MenuItem>
              </TextField>

              <TextField
                select
                label="Status"
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value)
                }
                fullWidth
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">
                  Active
                </MenuItem>
                <MenuItem value="inactive">
                  Inactive
                </MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </Paper>

        {/* TABLE */}
        <Paper
          sx={{
            mt: 2,
            borderRadius: 5,
            overflow: "hidden",
            border: `2px solid ${darkGreen}`,
          }}
        >
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                  page: 0,
                },
              },
            }}
            sx={{
              border: "none",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#edf2e5",
                color: darkGreen,
                fontWeight: 700,
              },

              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },

              "& .MuiDataGrid-columnHeader:focus": {
                outline: "none",
              },
            }}
          />
        </Paper>

        {/* MODAL */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle
            sx={{
              background: darkGreen,
              color: fairyPink,
              fontWeight: 700,
            }}
          >
            {isEditing
              ? "Edit Fairy Article"
              : "Add Fairy Article"}
          </DialogTitle>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={newArticle.image}
              onChange={handleChange}
              error={!!errors.image}
              helperText={errors.image}
            />
          </Stack>
          {newArticle.image && (
            <Box
              component="img"
              src={newArticle.image}
              alt="Article Preview"
              sx={{
                width: "100%",
                maxHeight: 220,
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid #ddd",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <DialogContent
            sx={{
              background: "#f7f8f2",
              pt: 3,
            }}
          >
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ flex: 1 }}
                >
                  <ShortTextIcon />

                <TextField
                    fullWidth
                    label="Slug"
                    name="slug"
                    value={newArticle.slug}
                    onChange={handleChange}
                    error={!!errors.slug}
                    helperText={errors.slug}
                  />
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ flex: 1 }}
                >
                  <TitleIcon />

                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={newArticle.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                  />
                </Stack>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="flex-start"
              >
                <ArticleIcon sx={{ mt: 1 }} />

                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  label="Content"
                  name="content"
                  value={newArticle.content}
                  onChange={handleChange}
                  error={!!errors.content}
                  helperText={errors.content}
                />
              </Stack>

              <Stack direction="row" spacing={4}>
                <Stack direction="row" alignItems="center">
                  <Typography>Featured</Typography>

                  <Switch
                    name="featured"
                    checked={newArticle.featured}
                    onChange={handleChange}
                  />
                </Stack>

                <Stack direction="row" alignItems="center">
                  <Typography>Status</Typography>

                  <Switch
                    name="isActive"
                    checked={newArticle.isActive}
                    onChange={handleChange}
                  />
                </Stack>
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              py: 2,
              background: "#f7f8f2",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                color: darkGreen,
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSaveArticle}
              sx={{
                background: fairyPink,
                color: darkGreen,
                fontWeight: 700,
                textTransform: "none",

                "&:hover": {
                  background: "#d97c90",
                },
              }}
            >
              {isEditing ? "Save Changes" : "Add Article"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      </>
    );
  };

export default DashArticleListPage;
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContent } from "../App";
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Body = () => {
  const { user } = useContext(UserContent);
  const [Listmovie, setListMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch initial movie data
  useEffect(() => {
    fetch("http://localhost:9999/movies")
      .then((res) => res.json())
      .then((data) => setListMovie(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  // Filter movies based on searchValue and id
  const listMovieType = useMemo(() => {
    if (id) {
      return Listmovie.filter((movie) => movie.typeID == id);
    } else if (searchValue) {
      return Listmovie.filter((movie) =>
        movie.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      return Listmovie;
    }
  }, [searchValue, Listmovie, id]);

  // Handle movie deletion
  const deleteMovie = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      fetch(`http://localhost:9999/movies/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setListMovie((prevMovies) =>
            prevMovies.filter((movie) => movie.id !== id)
          );
          console.log("Movie deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting movie:", error);
        });
    }
  };

  // Navigate to movie update page
  const update = (id) => {
    navigate(`/edit2/${id}`);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="container-fluid d-flex row">
      <div className="wrap col-md-3">
        <h2>Thể loại</h2>
        <div className="list-group">
          <Link to={`/${1}`} className="list-group-item list-group-item-action">
            Hành động
          </Link>
          <Link to={`/${2}`} className="list-group-item list-group-item-action">
            Tình cảm
          </Link>
          <Link to={`/${3}`} className="list-group-item list-group-item-action">
            Kinh dị
          </Link>
          <Link to={`/${4}`} className="list-group-item list-group-item-action">
            Hoạt Hình
          </Link>
          <Link to={`/${5}`} className="list-group-item list-group-item-action">
            Khoa học - Nghệ thuật
          </Link>
          <Link to="/" className="list-group-item list-group-item-action">
            Tất cả
          </Link>
        </div>
      </div>

      <div className="col-md-9">
        {/* <Slider {...sliderSettings}>
          {Listmovie.map((movie) => (
            <div key={movie.id}>
              <img src={movie.image} alt={movie.name} />
            </div>
          ))}
        </Slider> */}

        <Box className="search" style={{ marginBottom: "2rem" }}>
          <Stack direction="row" spacing={1}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              sx={{ width: 500 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outlined" onClick={() => setSearchValue(search)}>
              Search
            </Button>
            {user?.role === "Admin" && (
              <Button variant="outlined" onClick={() => navigate("/edit")}>
                Add new
              </Button>
            )}
          </Stack>
        </Box>

        <Grid container>
          {listMovieType.map((movie) => (
            <Grid item sm={4} style={{ marginBottom: "2rem" }} key={movie.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 500 }} image={movie.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Năm: {movie.Year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Loại: {movie.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Điểm: {movie.score}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`movie-detail/${movie.id}`}>
                    <Button size="small" variant="contained">
                      Đánh giá
                    </Button>
                  </Link>
                  {user?.role === "Admin" && (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => update(movie.id)}
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => deleteMovie(movie.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Body;

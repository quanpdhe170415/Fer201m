import { Link, Navigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContent } from "../App";
import "./Body.css";

import "bootstrap/dist/css/bootstrap.min.css";
import movie from "./data.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  TextField
} from "@mui/material";
import { event } from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';

const Body = () => {
  // view list movie
  const { user } = useContext(UserContent);
  const [Listmovie, setListMovie] = useState(movie);
  const [account, setAccount] = useState({});

    
  // search movie
  const [search, setSearch] = useState("");

  const [searchValue, setSearchValue] = useState("");

  // search movie
  const listMovieFilter = useMemo(() => {
    return [
      ...Listmovie.filter((movie) =>
        movie.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    ];
  }, [searchValue, Listmovie]);
  // -------------------------search ----------------------

  const { id } = useParams();

  // alert('day la id '+id)
  // filter type
  const [listMovieType2, setlistMovieType] = useState([])
  const listMovieType = useMemo(() => {
    if (id) {
      return [
        ...Listmovie.filter((movie) =>
          movie.typeID == id
        )];
    }
    else if (searchValue) {
      return [
        ...Listmovie.filter((movie) =>
          movie.name.toLowerCase().includes(searchValue.toLowerCase())
        ),
      ];
    }
    else {
      return [...Listmovie]
    }
  }, [searchValue, Listmovie, id]);

  // -----------------------------------


  useEffect(() => (
    setlistMovieType(listMovieType)
  ), [listMovieType2])

  function deleteMovie(event) {
    //   // alert(event.target.value);
    let id = event.target.value;
    if (window.confirm("Are you sure you want to delete this movie")) {

      fetch(`http://localhost:9999/movies/${id}`, {
        method: 'GET'
      }).then(res => res.json())
        .then(response => { setAccount(response) });

      console.log(Object.entries(account));
      fetch(`http://localhost:9999/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
      })
        .then(res => res.json())
        .then(json =>
          navigate('/:id'))
    }

  }

  //   // fetch(`http://localhost:3000/movies/${removeData.name}`, {
  //   // method: 'DELETE',
  //   // headers: {
  //   //     'Content-Type':'application/json'
  //   // },
  //   // body: JSON.stringify(functionAbove)
  //   // })
  //   // .then(res => res.json())
  //   // .then(json => displayData(json))


  const navigate = useNavigate();
  function handleAdd() {
    navigate('/edit')
  }

  function update(event) {
    let id = event.target.value;
    // alert(id);
    navigate(`/edit2/${id}`)
  }
  const sliderSettings = {
    dots: true, // Hiển thị các chấm
    infinite: true, // Vòng lặp vô tận
    speed: 500, // Tốc độ chuyển đổi slide (milliseconds)
    slidesToShow: 3, // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1, // Số lượng slide chuyển đổi mỗi lần
  };
  return (
    <div className="container-fluid d-flex row">
      <div className="wrap col-md-3">
        <h2>Thể loại</h2>
        <div class="list-group">
          <Link to={`/${1}`} className="list-group-item list-group-item-action ">
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
          <Link to={`/${5}`} class="list-group-item list-group-item-action">
            Khoa học - Nghệ thuật
          </Link>
        </div>
      </div>
      <div className="col-md-9">
      <Slider {...sliderSettings}>
          {movie.map((movie) => (
            <div key={movie.id}>
              <img src={movie.image} alt={movie.name} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="col-md-9">

        <React.Fragment>
          {/* search form */}
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
              {
                user?.role === 'Admin' ?
                  <Button variant="outlined" onClick={handleAdd}>
                    Add new
                  </Button> : ""
              }

            </Stack>
          </Box>
        </React.Fragment>

        <Grid container>
          {
            Listmovie.map((movie, index) => (
              <Grid item sm={4} style={{ marginBottom: "2rem" }}>
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

                    {
                      user?.role === 'Admin' ?
                        <Button size="small" variant="contained" onClick={update} value={movie.id}>
                          Update
                        </Button> : ""


                    }

                    {
                      user?.role === 'Admin' ?
                        <Button size="small" value={movie.id} variant="contained" onClick={deleteMovie}>
                          Delete
                        </Button> : ""


                    }
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

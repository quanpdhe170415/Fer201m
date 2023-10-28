import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Body.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import {Button} from "@mui/material";

import movie from "./data.json";
import comment from "./comment.json";
import "./MovieDetail.css";

const MovieDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [listMovie, setListMovie] = useState(movie);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [showFormReview, setShowFormReview] = useState(false);
  const [pointReview, setPointReview] = useState(9)
  const [commnetReview, setCommentReview] = useState('')
  const [commentList, setCommentList] = useState(comment)


  const getMovie = listMovie.filter((movie) => movie.id == id);
  useEffect(() => {
    setCurrentMovie(...getMovie);
  }, [listMovie]);

  const handleEvaluation = (e) => {
    e.preventDefault();
    setShowFormReview(!showFormReview);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setCommentList([...[{userName: 'Long', comment:commnetReview, point: pointReview }],... commentList])
    setCommentReview('')
    setPointReview('')
  }

  const handleChangePoint = (e) => {
    setPointReview(e.target.value)
  }

  const handleChangeComment = (e) => {
    setCommentReview(e.target.value)

  }

  return (
    <div style={{width: "95%", marginLeft: "5rem"}}>
      <div className="movie-detail row">
          <div className="movie-detail__left movie-detail__item col-md-4">
            <div className="left-content">
              <img src={`/${currentMovie.image}`} alt="" />
            </div>
          </div>
          <div className="movie-detail__right movie-detail__item col-md-7"style ={{marginLeft: "2rem"}}>
            <div className="right-content">
              <div className="right-content__item">
                <h1>{currentMovie?.name}</h1>
                <p>
                  <b>Thể loại: </b>
                  {currentMovie?.type}
                </p>
                <p>
                  <b>Điểm đánh giá: </b> {currentMovie?.score}
                </p>
                <p>
                  <b>Mô tả: </b>
                  {currentMovie?.description}
                </p>
                <div>
                  <Button variant="contained" onClick={handleEvaluation}>Đánh giá</Button>
                </div>
                <hr />
              </div>
              {showFormReview ? (
                <div className="right-content__item">
                  <h1>Chi tiết đánh giá: </h1>
                  <div>
                    <form>
                      <label for="point">Điểm đánh giá: </label>
                      <input
                        name="point"
                        type="number"
                        id="point"
                        onChange={handleChangePoint}
                        value={pointReview}
                        style={{ marginLeft: "4px" }}
                      ></input>
                      <p>
                        <label for="comment">Bình luận: </label>
                      </p>
                      <textarea
                        name="w3review"
                        rows="4"
                        cols="50"
                        id="comment"
                        value={commnetReview}
                        onChange={handleChangeComment}
                      ></textarea>
                      <div>
                        <Button variant="contained" onClick={handleSubmitReview}>Submit</Button>
                        <Button variant="contained"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowFormReview(false);
                          }}
                          style={{ marginLeft: "8px" }}
                        >
                          Close
                        </Button>
                      </div>
                    </form>
                  </div>
                  <hr />
                </div>
              ) : null}

              <div className="right-content__item">
                <h1>Bình luận:</h1>
                {commentList.map((comment) => (
                  <p>
                    <b>{comment.userName}: </b> {comment.comment}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MovieDetail;

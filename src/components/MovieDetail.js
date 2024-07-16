import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { UserContent } from "../App"; // đường dẫn chính xác tới App.js
import "./MovieDetail.css";

const MovieDetail = () => {
  const { user } = useContext(UserContent); // Sử dụng context để lấy thông tin người dùng
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [currentMovie, setCurrentMovie] = useState({});
  const [showFormReview, setShowFormReview] = useState(false);
  const [pointReview, setPointReview] = useState(9);
  const [commentReview, setCommentReview] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    // Fetch movie data
    axios.get(`http://localhost:9999/movies/${id}`).then((response) => {
      setCurrentMovie(response.data);
    });

    // Fetch comments for the movie
    axios.get(`http://localhost:9999/comments?movieId=${id}`).then((response) => {
      setCommentList(response.data);
    });
  }, [id]);

  const handleEvaluation = (e) => {
    e.preventDefault();
    if (!user || !user.name) {
      alert("Bạn phải đăng nhập để đánh giá.");
      return;
    }
    setShowFormReview(!showFormReview);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newComment = {
      userName: user.name, // Lấy tên người dùng từ context
      comment: commentReview,
      point: pointReview,
      movieId: parseInt(id),
    };

    // Post new comment to JSON server
    axios.post(`http://localhost:9999/comments`, newComment).then((response) => {
      setCommentList([response.data, ...commentList]);
      setCommentReview("");
      setPointReview(9);
      setShowFormReview(false);
    });
  };

  const handleChangePoint = (e) => {
    setPointReview(e.target.value);
  };

  const handleChangeComment = (e) => {
    setCommentReview(e.target.value);
  };

  return (
    <div style={{ width: "95%", marginLeft: "5rem" }}>
      <div className="movie-detail row">
        <div className="movie-detail__left movie-detail__item col-md-4">
          <div className="left-content">
            <img src={`/${currentMovie.image}`} alt="" />
          </div>
        </div>
        <div className="movie-detail__right movie-detail__item col-md-7" style={{ marginLeft: "2rem" }}>
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
                <Button variant="contained" onClick={handleEvaluation}>
                  Đánh giá
                </Button>
              </div>
              <hr />
            </div>
            {showFormReview ? (
              <div className="right-content__item">
                <h1>Chi tiết đánh giá: </h1>
                <div>
                  <form>
                    <label htmlFor="point">Điểm đánh giá: </label>
                    <input
                      name="point"
                      type="number"
                      id="point"
                      onChange={handleChangePoint}
                      value={pointReview}
                      style={{ marginLeft: "4px" }}
                    ></input>
                    <p>
                      <label htmlFor="comment">Bình luận: </label>
                    </p>
                    <textarea
                      name="comment"
                      rows="4"
                      cols="50"
                      id="comment"
                      value={commentReview}
                      onChange={handleChangeComment}
                    ></textarea>
                    <div>
                      <Button variant="contained" onClick={handleSubmitReview}>
                        Submit
                      </Button>
                      <Button
                        variant="contained"
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
                <p key={comment.id}>
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

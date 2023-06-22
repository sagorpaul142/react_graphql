import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_AllPosts} from "../graphql/postQuery";
import {useNavigate} from "react-router-dom";
import Modal from "./Modal";
import {DELETE_POST_BY_ID} from "../graphql/postMutation";

const AllPost = () => {
    const [showModal, setShowModal] = useState(false)
    const [singlePost, setSinglePost] = useState(null)
    const [allPosts, setAllPosts] = useState([])
    const {loading, data} = useQuery(GET_AllPosts)
    const navigate = useNavigate()
    const [delete_post_by_id] = useMutation(DELETE_POST_BY_ID)

    useEffect(() => {
      if (data?.allPosts) {
        setAllPosts(data.allPosts)
      }
    }, [data])

    const deleteHandler = (post) => {
      setShowModal(true)
      setSinglePost(post)
    }
    const confirmDeleteHandler = () => {
      delete_post_by_id({
        variables: {
          id: singlePost.id
        }
      }).then(() => {
        setAllPosts((post) => post.filter(_ => _.id !== singlePost.id))
        setShowModal(false)
        setSinglePost(null)
      })
    }
    const closeHandler = () => {
      setShowModal(false)
      setSinglePost(null)
    }

    return (
      <div>
        <button
          className={'btn-primary btn my-4'}
          onClick={() => navigate('/add-post')}>
          Add Post
        </button>
        {
          loading ? "Loading" :
            allPosts?.length > 0 && allPosts.map((post) => {
              return (
                <div className={'d-flex align-items-center'} key={post.id}>
                  <h1> {post.title} </h1>
                  <button
                    onClick={() => navigate(`/edit-post/${post.id}`)}
                    className={'btn btn-secondary mx-3'}>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHandler(post)}
                    className={'btn btn-danger mx-3'}>
                    Delete
                  </button>
                </div>
              )
            })
        }

        {
          showModal &&
          <Modal post={singlePost} closeHandler={closeHandler} confirmDeleteHandler={confirmDeleteHandler}/>
        }
      </div>
    );
  }
;

export default AllPost;

import {useForm} from 'react-hook-form';
import {useMutation} from "@apollo/client";
import {ADD_POST} from "../graphql/postMutation";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddPost = () => {
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, reset} = useForm()
  const [addPost] = useMutation(ADD_POST)
  const navigate = useNavigate()

  const initValue = {
    title: '',
    views: '',
    user_id: ''
  }
  const onSubmit = (data) => {
    setLoading(true)
    addPost({
      variables: {
        title: data.title,
        views: parseInt(data.views),
        user_id: parseInt(data.user_id)
      },

    }).then(() => {
      if (isSubmitSuccessful) {
        reset({...initValue})
      }
      setLoading(false)
      navigate('/posts')
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }
  return (
    <div style={{margin: "25px"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="validationCustom01" className="form-label">Post Title</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            placeholder="Post title"
            {...register("title", {required: true, min: 10, maxLength: 100})}
          />
          {errors?.title?.type === "required" &&
            <div className={'invalid-feedback d-inline'}>Title is required</div>}
          {errors?.title?.type === "min" &&
            <div className={'invalid-feedback d-inline'}>
              Title minimum 10 character is required
            </div>}
          {errors?.title?.type === "maxLength" &&
            <div className={'invalid-feedback d-inline'}>
              Title minimum 100 character is required
            </div>}
        </div>

        <div className="mb-3">
          <label htmlFor="validationCustom02" className="form-label">Post Title</label>
          <input
            type="number"
            className="form-control"
            id="validationCustom02"
            placeholder="Views"
            {...register("views", {required: true, min: 10, maxLength: 100})}
          />
          {errors?.views?.type === "required" &&
            <div className={'invalid-feedback d-inline'}>Views is required</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="validationCustom02" className="form-label">Post Title</label>
          <input
            type="number"
            className="form-control"
            id="validationCustom02"
            placeholder="User Id"
            {...register("user_id", {required: true, min: 10, maxLength: 100})}
          />
          {errors?.user_id?.type === "required" &&
            <div className={'invalid-feedback d-inline'}>Views is required</div>}
        </div>

        <button className={'btn btn-primary'} disabled={loading} type={'submit'}>Submit</button>
      </form>

    </div>
  );
};

export default AddPost;

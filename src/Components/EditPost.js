import {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {GET_POST_BY_ID} from "../graphql/postQuery";
import {useForm} from "react-hook-form";
import {UPDATE_POST} from "../graphql/postMutation";

const EditPost = () => {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, setValue, formState: {errors, isSubmitSuccessful}} = useForm()
    const [update_post] = useMutation(UPDATE_POST)
    const {id} = useParams()
    const navigate = useNavigate()
    const {data} = useQuery(GET_POST_BY_ID,
        {variables: {id: Number(id)}},
        {fetchPolicy: 'no-cache'}
    )
    useEffect(() => {
        if (data?.Post) {
            setPost(data.Post)
            setValue('title', data?.Post?.title)
            setValue('views', data?.Post?.views)
            setValue('user_id', data?.Post?.user_id)
        }
    }, [data])

    const onSubmit = (data) => {
        setLoading(true)
        console.log(post.id)
        update_post({
            variables: {
                id: post.id,
                title: data.title,
                views: parseInt(data.views),
                user_id: parseInt(data.user_id)
            }
        }).then(() => {
            if (isSubmitSuccessful) {
                setLoading(false)
            }
            navigate('/posts')
        }).catch(() => {
            setLoading(false)
        })
    }
    return (
        <>
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
        </>
    );
};

export default EditPost;

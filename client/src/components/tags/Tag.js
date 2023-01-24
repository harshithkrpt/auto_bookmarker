import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { addTagThunk, deleteTagThunk, getTagsThunk } from '../../redux/tags/tagsActions';
import { getColor } from '../../utils/validators';
import Delete from '../svgs/Delete';


function Tag(props) {
    const { tags, getTags, addTag,deleteTag } = props;
    const [tagState, setTagState] = useState({ name: '' })


    useEffect(() => {
        getTags();
    }, [getTags]);

    const handleAddTag = () => {
        addTag(tagState)
        setTagState({ name:''});
    }

    const handleTagChange = (e) => {
        setTagState({ name: e.target.value });
    }


    const handleDelete = (id) => {
        console.log("shdhsdhdshdsh")
        deleteTag({id})
    }

    return (
        <div>
            <h2 className='text-center'>#Tags</h2>
            <div>
                {
                    tags.map((tag,index) => {
                        return <button type="button" onClick={() => {handleDelete(tag.id)}} style={{ margin: '5px 5px 5px 5px'}}  key={tag.id} className={getColor(index)} >{tag.name.length < 15 ? tag.name : (tag.name.slice(0,15)+'...')} <Delete /> </button>
                    })
                }
            </div>
            <div className="input-group mb-3 mt-3">
                <input type="text" className="form-control" value={tagState.name} onChange={handleTagChange} placeholder="Enter Tag" aria-label="Enter Tag" aria-describedby="v" />
                <div className="input-group-append">
                    <span className="input-group-text" onClick={() => { handleAddTag() }} id="basic-addon2">Add Tag</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tags: state.tags.tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTag: (payload) => {
            dispatch(addTagThunk(payload));
        },
        deleteTag: (payload) => {
            dispatch(deleteTagThunk(payload));
        },
        getTags: () => {
            dispatch(getTagsThunk());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
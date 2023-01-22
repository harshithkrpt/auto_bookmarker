import { addBookmark, readBookmark, removeBookmark, updateBookmark } from './redux/bookmark/bookmarkActions'
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { isValidUrl } from './utils/validators';
import Delete from './components/svgs/Delete';
import Edit from './components/svgs/Edit';

function App(props) {

  const [bookmarkData, setBookmarkData] = useState({ id: '', currentBookmarkValue: '' });
  const [ addInput, setAddInput ] = useState({ isAdd: true });

  const handleBookmarkInpChange = (e) => {
    setBookmarkData({ currentBookmarkValue: e.target.value, id: bookmarkData.id ? bookmarkData.id : uuid() });
  }

  const handleAddBookmark = (e) => {
    if (bookmarkData.currentBookmarkValue !== '' && isValidUrl(bookmarkData.currentBookmarkValue)) {
      props.addBookmark(bookmarkData)
      setBookmarkData({ id: '', currentBookmarkValue: '' });
    }
  }

  const handleDelete = (id) => {
    if(id !== '') {
      props.removeBookmark({id})
    }
  }

  const handleUpdateBookmark = () => {
    // Update the Redux store
    if(bookmarkData.currentBookmarkValue !== '' && isValidUrl(bookmarkData.currentBookmarkValue)){
      props.updateBookmark(bookmarkData);
    }
    else {
      alert("Not a Valid URL")
    }
    setAddInput({isAdd: true});
    setBookmarkData({id:'',currentBookmarkValue:''});
  }

  const handleUpdate = (bookmark) => {
    setAddInput({isAdd: false});
    setBookmarkData({id: bookmark.id,currentBookmarkValue: bookmark.currentBookmarkValue});
  }


  return (
    <div className="App container">
      <h1>BOOKMARK URLS</h1>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#UUID</th>
            <th scope="col">BookMark Value</th>
            <th scope='col'>Delete</th>
            <th scope='col'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {
           props.bookmarks.length !== 0 && props.bookmarks.map(bookmark => {
              return (
                <tr key={bookmark.id}>
                  <th scope='row' data-toggle="tooltip" data-placement="top" title={bookmark.id}>{bookmark.id.slice(0, 4)}...</th>
                  <td>{bookmark.currentBookmarkValue}</td>
                  <td onClick={() => { handleDelete(bookmark.id) }}><Delete /></td>
                  <td onClick={() => { handleUpdate(bookmark) }}><Edit /></td>
                </tr>
              )
            })
          }
        </tbody>

      </table>
      <br />
      <div className="input-group mb-3">
        <input type="text" className="form-control" value={bookmarkData.currentBookmarkValue} onChange={handleBookmarkInpChange} placeholder="Enter Bookmark URL" aria-label="Enter Bookmark URL" aria-describedby="v" />
        <div className="input-group-append">
          <span className="input-group-text" onClick={() => { addInput.isAdd ? handleAddBookmark() : handleUpdateBookmark()  }} id="basic-addon2">{addInput.isAdd ? "Add" : "Update"}</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmarks.bookmarks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readBookmark: () => {
      dispatch(readBookmark());
    },
    addBookmark: (payload) => {
      dispatch(addBookmark(payload))
    },
    removeBookmark: (payload) => {
      dispatch(removeBookmark(payload))
    },
    updateBookmark: (payload) => {
      dispatch(updateBookmark(payload))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);


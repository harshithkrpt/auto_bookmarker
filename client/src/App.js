import { addBookmarkThunk, readBookmark, deleteBookmarkThunk , updateBookmarkThunk, fetchBookMarks } from './redux/bookmark/bookmarkActions'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { isValidUrl } from './utils/validators';
import Delete from './components/svgs/Delete';
import Edit from './components/svgs/Edit';
import Tag from './components/tags/Tag';

function App(props) {

  const { fetchBookMarks,addBookmark,removeBookmark,updateBookmark, bookmarks} = props;

  // BookMark Data
  const [bookmarkData, setBookmarkData] = useState({ currentBookmarkValue: '' });
  // Input Adding / Updating Flag
  const [addInput, setAddInput] = useState({ isAdd: true });

  // Will run once to fetch the data
  useEffect(() => {
    fetchBookMarks()
  },[fetchBookMarks]);

  const handleBookmarkInpChange = (e) => {
    setBookmarkData({...bookmarkData, currentBookmarkValue: e.target.value });
  }

  const handleSubmitBookmark = () => {
    if (isValidUrl(bookmarkData.currentBookmarkValue)) {
      if(addInput.isAdd) {
        addBookmark(bookmarkData);
      }
      else if(bookmarkData.id) {
        updateBookmark(bookmarkData);
        setAddInput({isAdd: true});
      }
    }
    else {
      alert("Not a Valid URL");
    }
    setBookmarkData({ currentBookmarkValue: '' });
  }

  const handleDelete = (id) => {
    if (id !== '') {
      removeBookmark({ id })
    }
  }

  const handleUpdate = (bookmark) => {
    setAddInput({isAdd: false})
    setBookmarkData({ currentBookmarkValue: bookmark.currentBookmarkValue, id: bookmark.id });
  }

  return (
    <div className="App container">
      <h1 className='text-center'>BOOKMARKS</h1>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#S.No</th>
            <th scope="col">#Bookmark</th>
            <th scope='col'>#Delete</th>
            <th scope='col'>#Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            bookmarks.length !== 0 && bookmarks.map((bookmark, index) => {
              return (
                <tr key={bookmark.id}>
                  <th scope='row'>{index + 1}</th>
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
          <span className="input-group-text" onClick={() => { handleSubmitBookmark() }} id="basic-addon2">{addInput.isAdd ? "Add" : "Update"}</span>
        </div>
      </div>

      <Tag />

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
      dispatch(addBookmarkThunk(payload))
    },
    removeBookmark: (payload) => {
      dispatch(deleteBookmarkThunk(payload))
    },
    updateBookmark: (payload) => {
      dispatch(updateBookmarkThunk(payload))
    },
    fetchBookMarks: () => {
      dispatch(fetchBookMarks());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);


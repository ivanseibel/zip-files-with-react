import { useCallback, useState } from "react";
import axios from 'axios';
import { saveAs } from 'file-saver';
import JSZip from "jszip";

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [file1, setFile1] = useState('');
  const [file2, setFile2] = useState('');

  const handleChangeFile1 = useCallback((e) => {
    setFile1(e.target.value);
  }, [])

  const handleChangeFile2 = useCallback((e) => {
    setFile2(e.target.value);
  }, [])

  const handleGetFile = useCallback(async () => {
    if (file1.length === 0 || file2.length === 0) {
      alert('You have to input two remote files');
      return;
    }

    try {
      setIsLoading(true);

      // Get remote files
      const file1Response = await axios.get(file1, {
        responseType: 'blob' // <== IMPORTANT
      });
      const file2Response = await axios.get(file2, {
        responseType: 'blob' // <== IMPORTANT
      });

      // Add (or update) a file to the zip file.
      const zip = new JSZip();
      zip.file('file1.pdf', file1Response.data, { binary: true });
      zip.file('file2.pdf', file2Response.data, { binary: true });

      // Generates the complete zip file at the current folder level.
      zip.generateAsync({ type: 'blob' }).then(blob => {
        setIsLoading(false);
        saveAs(blob, 'file.zip');
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

  }, [file1, file2]);

  return (
    <div className="main-container">
      <h2>Zip Files With React.js</h2>
      <div className="url-inputs-container" >
        <label htmlFor="url1">
          Remote PDF File 1
          <input type="text" name="url1" id="url1" onChange={handleChangeFile1} />
        </label>
        <label htmlFor="url2">
          Remote PDF File 1
          <input type="text" name="url2" id="url2" onChange={handleChangeFile2} />
        </label>
      </div>

      <div className="button-container">
        <button onClick={handleGetFile} >
          Get zip file
        </button>
      </div>

      <p>
        {isLoading && (
          <span>Wait while we prepare the zip file for you...</span>
        )}
      </p>
    </div>
  );
}

export default App;

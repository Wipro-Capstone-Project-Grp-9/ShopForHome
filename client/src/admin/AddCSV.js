import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { parse } from "papaparse";
import "./AddCSV.css";


function AddCSV() {
    const {
        user: { _id, name},
      } = isAuthenticated();
    
      const [highlighted, setHighlighted] = React.useState(false);
      const [contacts, setContacts] = React.useState("No File Is Uploaded");

      
  return (
    <Layout
      title='Upload CSV'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row_CSV'>

      <div
        className={`p-6 my-2 mx-auto max-w-md border-2 ${
          highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
              const text = await file.text();
              const result = parse(text, { header: true });
              const obj = JSON.stringify(result);
              console.log(obj);
              setContacts("CSV FILE UPLOADED");
            });

        }}
      >
        DROP HERE
      </div>

      <ul>{contacts}</ul>
      </div>
    </Layout>
  )
}

export default AddCSV
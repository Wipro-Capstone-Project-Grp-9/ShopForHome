import React, { useState, useEffect } from "react";
import { lessStock } from "./apiAdmin";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Layout from "../core/Layout";



const RequestEmail = () => {
  const [products, setproduct] = useState([]);
  const loadproduct = () => {
    lessStock().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setproduct(data);
      }
    });
  };
  useEffect(() => {
    loadproduct();
  }, []);

  return (
    <>
    < Layout title="Request Email" description="Ordering stock from email, if stock is less than 10-quantity" />
    <div style={{ display:'flex', justifyContent:'center'}}>
      <table style={{backgroundColor:'brown', color:'white',width:'70%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{fontWeight:'bold', border:'3px solid white'}}>
            <td style={{padding:'10px', border:'2px solid white'}}> Product Name </td>
            <td style={{padding:'10px', border:'2px solid white'}}> Product Quantity </td>
            <td style={{padding:'10px', border:'2px solid white'}}> Email for stock </td>
          </tr>
        </thead>
        <tbody>
          {products.map((p,index) => (
            p.quantity<"10"?(
              <>
                
            <tr>
              <td style={{padding:'10px', border:'2px solid white'}}> {p.name}</td>
              <td style={{padding:'10px', textAlign:'center', border:'2px solid white'}} >{p.quantity}</td>
              <td style={{padding:'10px', border:'2px solid white',justifyContent:'center',display:"flex"}}><Link names={p.name} to="sendemail">
                   <Button names={p.name} style={{backgroundColor:'skyblue',color:'black'}}>
                     Email
                   </Button>
                </Link></td>
            </tr>
              </>
            ):null
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default RequestEmail;

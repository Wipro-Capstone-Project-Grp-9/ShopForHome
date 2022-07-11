import React from 'react';
import emailjs from 'emailjs-com';
import Layout from '../core/Layout'
export default function SendEmail(props) {

  function sendEmail(e) {
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

    emailjs.sendForm('service_cs41sy6', 'template_yg80lrm', e.target, 'G_03z5oB_IBPa9ryA')
      .then((result) => {
          window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          alert("✅✅✅ Message sent successfully ✅✅✅")
      }, (error) => {
          console.log(error.text);
          alert("❌ Message not sent ❌")

      });
  }

  return (
    <>
    <Layout title="Stock request form" description="Requesting selller through email to send stock." />
    <form className="contact-form" onSubmit={sendEmail} style={{justifyContent:'center',display:'flex'}} >
      <label style={{padding:'10px'}}>Name</label>
      <input type="text" name="from_name" />
      <label style={{padding:'10px'}}>Email</label>
      <input type="email" name="from_email" />
      <label style={{padding:'10px'}}>Subject</label>
      <input type="text" name="subject" value={"Required stock"}/>
      <label style={{padding:'10px'}}>Message</label>
      <textarea style={{padding:'10px'}} name="html_message" />
      <input style={{marginLeft:'10px', backgroundColor:'lightgreen', fontWeight:'bold', borderRadius:'10px'}} type="submit" value="Send Email." />
    </form>

    </>
    
  );
}
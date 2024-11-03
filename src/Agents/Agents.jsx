
import styles from "./Agents.module.css";
import { Link } from 'react-router-dom';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';




function Agents() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_z3o8yah', 'template_xg7c39v', form.current, 
        'Iy0jS-VRsLFZGi9uS',
      )
      .then(
        () => {
          console.log('message sent');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div>    
      <h1 className={styles.Cagents}>CAPE TOWN (CPT) AGENTS</h1>
      
      <div className={styles.cardscontainer1}>
        {/* First Agent Card */}
        <div className={styles.agent1}>
          <div className={styles.gradient}>
            <div className={styles.profiledown}>
              <img src='/assets/John.png' alt="John" />
              <h1 className={styles.profiletitle}>John Mayor</h1>
              <p className={styles.profiledescription}>
              John Mayor is a Cape Town property expert with a reputation for<br />
    excellent service and market insights. With a strong commitment<br />
    to helping clients navigate Cape Town’s diverse real estate scene,<br />
    he’s focused on achieving successful results.
              </p>
              <a href='mailto:thembaramanamane@gmail.com' className={styles.profilebtn}>Contact Me</a>
            </div>
          </div>
        </div>

        {/* Second Agent Card */}
        <div className={styles.agent1}>
          <div className={styles.gradient}>
            <div className={styles.profiledown}>
              <img src='/assets/Buhle.png' alt="Buhle" />
              <h1 className={styles.profiletitle}>Buhle Samuels</h1>
              <p className={styles.profiledescription}>
              Buhle Samuels is a dedicated Cape Town real estate agent known for her<br />
    client-focused approach and deep local market knowledge.<br />
    She’s passionate about matching clients with properties that align<br />
    perfectly with their lifestyle needs.
              </p>
              <a href='mailto:thembaramanamane@gmail.com' className={styles.profilebtn}>Contact Me</a>
            </div>
          </div>
        </div>

        {/* Third Agent Card */}
        <div className={styles.agent1}>
          <div className={styles.gradient}>
            <div className={styles.profiledown}>
              <img src='/assets/Oliver.png' alt="Oliver" />
              <h1 className={styles.profiletitle}>Oliver Green</h1>
              <p className={styles.profiledescription}>
              Oliver Green is a dedicated real estate agent specializing in<br />
    Cape Town’s market. Known for his expertise and commitment,<br />
    he consistently guides clients to find their ideal properties<br />
    in the city.
              </p>
              <a href='mailto:thembaramanamane@gmail.com' className={styles.profilebtn}>Contact Me</a>
            </div>
          </div>
        </div>
      </div>

      <h1 className={styles.Jagents}>JOHANNESBURG (JHB) AGENTS</h1>
      <div className={styles.cardscontainer2}>
        {/* First Agent Card */}
        <div className={styles.agent1}>
          <div className={styles.gradient}>
            <div className={styles.profiledown}>
              <img src='/assets/Sihle.png' alt="Sihle" />
              <h1 className={styles.profiletitle}>Sihle Mabilo</h1>
              <p className={styles.profiledescription}>
              Sihle Mabilo is an energetic real estate agent specializing in Johannesburg's vibrant market.<br />
  Known for his personalized service and negotiation skills, he is dedicated to helping clients find<br />
  properties that fit their lifestyle and investment goals.
              </p>
              <a href='mailto:thembaramanamane@gmail.com' className={styles.profilebtn}>Contact Me</a>
            </div>
          </div>
        </div>

        {/* Second Agent Card */}
        <div className={styles.agent1}>
          <div className={styles.gradient}>
            <div className={styles.profiledown}>
              <img src='/assets/Jack.png' alt="Jack" />
              <h1 className={styles.profiletitle}>Jack Miller</h1>
              <p className={styles.profiledescription}>
              Jack Miller brings a wealth of experience to the Johannesburg real estate scene.<br />
  With a keen eye for potential and a focus on customer satisfaction, he guides clients through<br />
  every step of the buying and selling process, ensuring a smooth experience.
              </p>
              <a href='mailto:thembaramanamane@gmail.com' className={styles.profilebtn}>Contact Me</a>
            </div>
          </div>
        </div>

        {/* Third Agent Card */}
        <div className={styles.agent1}>
          <div className={styles.gradient}>
            <div className={styles.profiledown}>
              <img src='/assets/Lily.png' alt="Lily" />
              <h1 className={styles.profiletitle}>Lily Thompson</h1>
              <p className={styles.profiledescription}>
              Lily Thompson is a dedicated real estate professional in Johannesburg, known for her attention<br />
  to detail and passion for the industry.<br />
  She prides herself on understanding her clients' needs and strives to connect them with homes<br />
  that truly reflect their style and aspirations.
              </p>
              <a href='mailto:thembaramanamane@gmail.com' className={styles.profilebtn}>Contact Me</a>
            </div>
          </div>
        </div>
      </div>
      <h1 className= {styles.formt}>Contact RealHome</h1>
      <form ref={form} onSubmit={sendEmail} className={styles.contact}>
      <label className={styles.titles} >Name</label>
      <input type="text" name="user_name" placeholder="Name Surname"  className={styles.inputs}/>
      <label className={styles.titles} >Email</label>
      <input type="email" name="user_email" placeholder="emailaddress@gamil.com" className={styles.inputs} />
      <label className={styles.titles} >Message</label>
      <textarea name="message"  className={styles.message} placeholder="type your message out"/>
      <input type="submit" value="Send" className={styles.send}   />
    </form>

    </div>
  );
}

export default Agents;

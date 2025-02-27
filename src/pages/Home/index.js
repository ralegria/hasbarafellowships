import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

import "./Home.scss";

const HomePage = ({ login = false }) => {
  return (
    <div className="home-page">
      <header>
        <h1>Student Fundraising Program</h1>
        <div className="overlay" />
      </header>
      <div className="content">
        <div className="info">
          <div className="info-col">
            <h2>
              Are You a Student Passionate About Defending Israel and Combating
              Antisemitism?
            </h2>
            <p>
              Hasbara Fellowships gives you the opportunity to experience Israel
              firsthand and gain the tools to become a leader on your campus.
              But we know that funding your trip can be a challenge.
              <br />
              <br />
              That’s why we created the Student Fundraising Program—a
              personalized micro-funding platform that empowers you to turn your
              dream of visiting Israel into reality.
              <br />
              <br />
              Raise the support you need, amplify your voice, and inspire your
              community to stand with Israel.
            </p>
          </div>
          <div className="info-col">
            <h3>How It Works</h3>
            <ol>
              <li>
                <div>
                  <b>Register for the Program:</b> Sign up with your name,
                  email, and college details to start your fundraising journey.
                </div>
              </li>
              <li>
                <div>
                  <b>Create Your Profile:</b> Personalize your fundraising
                  page—upload a photo, share your story, and set a fundraising
                  goal. Tell the world why this trip matters and how it will
                  empower you to make an impact.
                </div>
              </li>
              <li>
                <div>
                  <b>Share Your Campaign:</b> Spread the word! Share your unique
                  profile link with family, friends, and your community to rally
                  support.
                </div>
              </li>
              <li>
                <div>
                  <b>Receive Secure Donations:</b> Supporters can donate
                  directly through your profile, ensuring all contributions go
                  toward funding your trip.
                  <br />
                  <br />
                  💡{" "}
                  <i>
                    100% of the funds raised will be managed by Hasbara
                    Fellowships and allocated directly to cover your travel
                    expenses.
                  </i>
                </div>
              </li>
            </ol>
          </div>
          <div className="info-col">
            <h3>About program</h3>
            <p>
              Empowering Voices, Building Impact
              <br />
              <br />
              The Hasbara Fellowships Student Fundraising Program is a
              game-changing platform designed to empower student leaders like
              you to make a difference. By joining, you’ll not only raise the
              funds needed for your trip but also inspire others to stand
              against antisemitism and advocate for Israel on campus.
              <br />
              <br />
              This experience will equip you with the firsthand knowledge,
              leadership skills, and confidence to become a powerful voice for
              truth and justice.
              <br />
              <br />
              Together, let’s build a future of resilience, education, and
              impact.
            </p>
          </div>
        </div>
        {!login && <RegisterForm />}
        {login && <LoginForm />}
      </div>
    </div>
  );
};

export default HomePage;

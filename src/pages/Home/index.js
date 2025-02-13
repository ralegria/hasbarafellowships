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
            <h2>Want to Stand for Israel and Fight Antisemitism on Campus?</h2>
            <p>
              Are you a student passionate about defending Israel, combating
              antisemitism, and becoming a leader in your community? Hasbara
              Fellowships offers you the opportunity to experience Israel
              firsthand and gain the tools you need to advocate effectively on
              your campus. But we understand that the cost of travel can be a
              challenge. That’s why we’ve created the Student Fundraising
              Program—a personalized micro-funding platform to help you turn
              your dream of visiting Israel into a reality. Let your voice be
              heard, inspire your community, and raise the support you need to
              embark on this transformative journey.
            </p>
          </div>
          <div className="info-col">
            <h3>Steps to Get Started:</h3>
            <ol>
              <li>
                <div>
                  <b>Register for the Program:</b> Sign up with your name,
                  email, and college details to begin your fundraising journey.
                </div>
              </li>
              <li>
                <div>
                  <b>Create Your Profile:</b> Personalize your fundraising page
                  by uploading your photo, sharing your story, and setting a
                  fundraising goal. Tell others why you’re passionate about
                  standing with Israel and how this trip will empower you to
                  make a difference.
                </div>
              </li>
              <li>
                <div>
                  <b>Share Your Profile:</b> Spread the word! Share the unique
                  URL of your profile with family, friends, and your community
                  to rally support for your trip.
                </div>
              </li>
              <li>
                <div>
                  <b>Receive Donations:</b> Supporters can visit your profile,
                  enter their name and email, and contribute to your campaign
                  securely. Disclaimer: All funds raised will be managed by
                  Hasbara Fellowships and allocated directly to cover your trip
                  expenses, ensuring your journey is fully funded.
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
              Welcome to Hasbara Fellowships’ Student Fundraising Program, a
              dynamic platform designed to empower passionate leaders like you
              to make a difference. By joining, you’ll not only create a
              personal profile to share your journey but also inspire others to
              support your mission of standing against antisemitism and
              advocating for Israel on campus. Through this program, you’ll gain
              the tools to effectively raise funds for your transformative
              Israel experience, where firsthand learning and leadership
              development equip you to become a strong voice for truth and
              justice. Together, let’s build a future of understanding,
              resilience, and impact.
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

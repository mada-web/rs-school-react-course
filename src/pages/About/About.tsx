import React from 'react';

import Container from '../../components/Container/Container';

import css from './About.module.css';

class About extends React.Component {
  render() {
    return (
      <Container>
        <div className={css.Wrapper}>
          <div className={css.MainContent}>
            <p className={`${css.LeadText} ${css.Text}`}>
              <b>RS School</b> is free-of-charge and community-based education program conducted by{' '}
              <a
                href="https://rollingscopes.com/"
                className={css.Link}
                target={'_blank'}
                rel="noreferrer"
              >
                The Rolling Scopes{' '}
              </a>{' '}
              developer community since 2013.
            </p>
            <p className={css.Text}>
              Everyone can study at RS School, regardless of age, professional employment, or place
              of residence.
            </p>
            <p className={css.Text}>
              The mentors and trainers of our school are front-end and javascript developers from
              different companies and countries.
            </p>

            <h5 className={`${css.Headline} ${css.Text}`}>OUR PRINCIPLES</h5>

            <div>
              <p className={css.Text}>
                <strong className={css.Yellow}>Open Source Philosophy</strong>
              </p>
              <p className={css.Text}>
                Our platform and education materials are publicly available on GitHub and YouTube.
              </p>
            </div>
            <div>
              <p className={css.Text}>
                <strong className={css.Yellow}>“Teach It Forward”</strong>
              </p>
              <p className={css.Text}>
                According to this principle, students study at school for free, but we request that
                they return as mentors to pass on their knowledge to the next generation of
                students.
              </p>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default About;

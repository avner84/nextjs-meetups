import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

function HomePage(props) {
  return <Fragment>
    <Head>
        <title>React Meetup</title>
    </Head>
   <MeetupList meetups={props.meetups} />;
   </Fragment>
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://avnerM84:mira2022@cluster0.iluwtme.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
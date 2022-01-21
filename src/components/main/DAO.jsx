/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, Divider, Typography, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';
import { ResponsiveNetwork } from '@nivo/network';
import { fetchMyHome } from '../../actions/main/homeAction';
import { fetchUserDetails } from '../../actions/userAction';
import AppBarBottom from './AppBarBottom';
import { fetchFamilyNetworks } from '../../actions/DaoAction';

const DAO = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails } = userDetails;

  // check for language on browser reload dir="" needs to change according to lang
  useEffect(() => {
    const getLanguage = () =>
      i18next.language || window.localStorage.i18nextLng;

    if (document.getElementById('direction')) {
      const currentLang = getLanguage();
      const elem = document.getElementById('direction');

      if (currentLang) {
        if (currentLang === 'fa') {
          elem.setAttribute('dir', 'rtl');
        } else {
          elem.setAttribute('dir', 'ltr');
        }
      }
    }
  }, []);

  // login
  useEffect(() => {
    dispatch(fetchFamilyNetworks());
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      history.push('/login?redirect=main/home');
    }
  }, [userInfo, successLogin, history, errorUserDetails]);

  // handle circle click
  let prevId = '';
  const handleClick = (e, node) => {
    const activeId = e.target.id;
    if (prevId !== '') {
      const prevCircle = document.getElementById(prevId);
      prevCircle.setAttribute('r', 15);
    }
    const circle = document.getElementById(activeId);
    circle.setAttribute('r', 30);
    prevId = e.target.id;
  };

  const theNetwork = useSelector((state) => state.theNetwork);
  const { network, loading: loadingNetwork, success: successHome } = theNetwork;

  // custom node
  useEffect(() => {
    if (network && network[0]) {
      let counter = 0;
      // 1 -start with only SAY in center
      const nodesList = {
        nodes: [
          {
            id: 'Node 0',
            height: 1,
            size: 54,
            color: 'rgb(97, 25, 87)',
            img: '/images/logo.png',
            childId: 1,
          },
        ],
        links: [],
      };
      // 2- for every child create a node
      for (let c = 0; c < network.length; c += 1) {
        const childNode = {
          id: `Node ${c + 1}`,
          height: 1,
          size: 94,
          color: 'rgb(97, 25, 87)',
          img: network[c].avatarUrl,
          childId: network[c].id,
        };
        nodesList.nodes.push(childNode);

        // 3- create link from child to SAY
        let link = {
          source: `Node 0`,
          target: `Node ${c + 1}`,
          distance: 80,
        };
        nodesList.links.push(link);
        // 4- create nodes of child's V-family
        for (let f = 0; f < network[c].family.currentMembers.length; f += 1) {
          counter += 1;
          const familyNode = {
            id: `Node ${counter}.0`,
            height: 1,
            size: 24,
            color: 'rgb(97, 25, 87)',
            img: network[c].family.currentMembers[f].avatarUrl,
            childId: c + f, // TODO: use user's id
          };
          // 5- create family and child link
          link = {
            source: `Node ${c + 1}`,
            target: `Node ${counter}.0`,
            distance: 80,
          };
          nodesList.links.push(link);
          nodesList.nodes.push(familyNode);
        }
      }
      console.log(nodesList);

      setData(nodesList);
    }
  }, [network]);

  // custom node
  const CustomPoint = ({ node }) => (
    <svg id="graph" width="100%" height="800px">
      <pattern
        id={`nodes.${node.data.childId}`}
        x="0%"
        y="0%"
        height="100%"
        width="100%"
        viewBox="0 0 512 512"
      >
        <image
          x="0%"
          y="0%"
          width="512"
          height="512"
          xlinkHref={node.data.img}
        />
      </pattern>

      <circle
        id={`node.${node.id}`}
        r={node.size / 2}
        opacity="1"
        transform={`translate(${node.x}, ${node.y}) scale(1)`}
        onClick={(e) => handleClick(e, node)}
        className="medium"
        fill={`url(#nodes.${node.data.childId})`}
        stroke="lightblue"
        strokeWidth="0.5%"
      />
    </svg>
  );

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      maxWidth
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        minHeight: '100vh',
        overflow: 'scroll',
      }}
    >
      {!loadingNetwork && successHome && network && data ? (
        <div
          style={{
            height: '80vh',
            width: '120%',
            direction: 'ltr',
          }}
        >
          <ResponsiveNetwork
            data={data}
            nodeComponent={CustomPoint}
            centeringStrength={0.3}
            linkBlendMode="multiply"
            motionConfig="wobbly"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            linkDistance={function (e) {
              return e.distance;
            }}
            repulsivity={54}
            nodeSize={function (n) {
              return n.size;
            }}
            activeNodeSize={function (n) {
              return 1.5 * n.size;
            }}
            nodeColor={function (e) {
              return e.color;
            }}
            nodeBorderWidth={1}
            nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
            linkThickness={function (n) {
              return 2 + 2 * n.target.data.height;
            }}
            linkColor="#2b544a"
            isInteractive
          />
        </div>
      ) : (
        <CircularProgress />
      )}
      <AppBarBottom path="dao" />
    </Grid>
  );
};

export default DAO;

<g className="circle trans left">
  {/* <circle
    id={`node.${node.id}`}
    r={node.size / 2}
    fill={node.color}
    strokeWidth="1"
    stroke="blue"
    opacity="1"
    transform={`translate(${node.x}, ${node.y}) scale(1)`}
    onClick={handleClick}
  /> */}
  {/* <image
  id={`node.${node.id}`}
  href="https://api.s.sayapp.company/files/39-child/39-sleptAvatar_0020010007.png"
  x="-10"
  y="-10"
  height="20px"
  width="20px"
  transform={`translate(${node.x}, ${node.y}) scale(1)`}
  style={{ border: '1px solid black', borderRadius: '50% !important' }}
  onClick={handleClick}
  preserveAspectRatio="xMidYMid slice"
/> */}
</g>;

// const obj = {
//   nodes: [
//     {
//       id: 'Node 0',
//       height: 1,
//       size: 54,
//       color: 'rgb(97, 25, 87)',
//       img: '/images/logo.png',
//       childId: 1,
//     },
//     {
//       id: 'Node 1',
//       height: 1,
//       size: 34,
//       color: 'rgb(97, 25, 87)',
//       img: network[1].avatarUrl,
//       childId: 2,
//     },
//     {
//       id: 'Node 2',
//       height: 1,
//       size: 24,
//       color: 'rgb(97, 25, 87)',
//       img: network[2].avatarUrl,
//       childId: 3,
//     },
//     {
//       id: 'Node 1.0',
//       height: 1,
//       size: 24,
//       color: 'rgb(97, 25, 87)',
//       img: network[3].avatarUrl,
//       participantId: 0,
//     },
//     {
//       id: 'Node 2.0',
//       height: 1,
//       size: 14,
//       color: 'rgb(9, 25, 87)',
//       img: network[4].avatarUrl,
//       participantId: 1,
//     },
//     {
//       id: 'Node 3.0',
//       height: 1,
//       size: 14,
//       color: 'rgb(9, 25, 87)',
//       img: network[4].avatarUrl,
//       participantId: 1,
//     },
//   ],
//   links: [
//     {
//       source: 'Node 0',
//       target: 'Node 1',
//       distance: 80,
//     },
//     {
//       source: 'Node 0',
//       target: 'Node 2',
//       distance: 80,
//     },
//     {
//       source: 'Node 1',
//       target: 'Node 1.0',
//       distance: 50,
//     },
//     {
//       source: 'Node 1',
//       target: 'Node 2.0',
//       distance: 50,
//     },
//     {
//       source: 'Node 0',
//       target: 'Node 3.0',
//       distance: 100,
//     },
//   ],
// };

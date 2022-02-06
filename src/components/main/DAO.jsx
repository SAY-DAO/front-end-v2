/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, Alert, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { ResponsiveNetwork } from '@nivo/network';
import { fetchUserDetails } from '../../actions/userAction';
import AppBarBottom from './AppBarBottom';
import { fetchFamilyNetworks } from '../../actions/DaoAction';

const DAO = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails } = userDetails;

  const theNetwork = useSelector((state) => state.theNetwork);
  const { network, loading: loadingNetwork, success: successHome } = theNetwork;

  // login
  useEffect(() => {
    if (!network) {
      dispatch(fetchFamilyNetworks());
    }
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      history.push('/login?redirect=main/home');
    }
  }, [userInfo, successLogin, history, errorUserDetails]);

  // add child node every ... second
  // useEffect(() => {
  //   if (network && childNumber <= network.length) {
  //     console.log('interval');
  //     let now = childNumber;
  //     // const t = setInterval(() => {
  //     now += 1;
  //     setChildNumber(now);
  //     // if (now > network.length) {
  //     //   clearInterval(t);
  //     // }
  //     // }, 200);
  //   }
  // }, []);

  // custom node
  useEffect(() => {
    setClicked(false);
    console.log('Children Nodes');
    if (network && network[0] && !data) {
      let link = {};
      let nodesList = {};
      // 1 -start with only SAY in center
      nodesList = {
        nodes: [
          // SAY in center
          {
            id: 'Node 0',
            height: 1,
            size: 40,
            color: '#f8d5af',
            img: '/images/logo.png',
            theId: 0,
          },
        ],
        // empty list
        links: [],
      };

      // 2- for every child create a node
      for (let c = 0; c < network.length; c += 1) {
        const childNode = {
          id: `Node ${c + 1}`,
          height: 1,
          size: 25,
          color: 'rgb(97, 205, 187)',
          img: network[c].avatarUrl,
          theId: network[c].id,
        };
        nodesList.nodes.push(childNode);

        // 3- create link from child to SAY
        link = {
          source: `Node 0`,
          target: `Node ${c + 1}`,
          distance: 100,
        };
        nodesList.links.push(link);
      }
      setData(nodesList);
    }
  }, [network, clicked]);

  // handle circle click
  function handleClick(e, node) {
    setClicked(true);
    console.log(data);
    let counter = 0;
    const nodesList = data;
    let prevId = '';
    let prevCircle = document.getElementById(prevId);

    if (!node.id.includes('.')) {
      setLoading(true);
      // select element and increase 'r'
      const activeId = e.target.id;
      const theId = Number(node.id.replace(/^\D+/g, '')); // theId = 37

      if (prevId !== '') {
        prevCircle.setAttribute('r', 15);
      }
      const circle = document.getElementById(activeId);
      circle.setAttribute('r', 30);
      prevId = e.target.id;

      // delete links/nodes if already one child selected
      for (let l = 0; l < nodesList.links.length; l += 1) {
        if (
          nodesList.links[l].source !== `Node 0` ||
          nodesList.links[l].target.includes('.')
        ) {
          if (l > -1) {
            nodesList.links.splice(l);
          }
        }
      }
      for (let f = 0; f < nodesList.nodes.length; f += 1) {
        if (nodesList.nodes[f].id.includes('.')) {
          if (f > -1) {
            nodesList.nodes.splice(f);
          }
        }
      }
      setData(nodesList);

      // create new links
      for (
        let f = 0;
        f < network[theId - 1].family.currentMembers.length;
        f += 1
      ) {
        counter += 1;
        // 4- create V-family nodes
        const familyNode = {
          id: `Node ${counter}.0`,
          height: 1,
          size: 4,
          color: 'rgb(232, 193, 160)',
          img:
            network[theId - 1].family.currentMembers[f].avatarUrl ||
            '/images/logo.png',
          theId: (theId + f) * counter, // TODO: use user's id
        };
        // 5- create family and child link
        const link = {
          source: `Node ${theId}`,
          target: `Node ${counter}.0`,
          distance: 15,
        };
        nodesList.links.push(link);
        nodesList.nodes.push(familyNode);
        setData(nodesList);
      }
      // 6 -click on the users
    } else {
      // select element and increase 'r'
      const activeId = e.target.id;
      console.log(activeId);
      if (prevId !== '') {
        prevCircle = document.getElementById(prevId);
        prevCircle.setAttribute('r', 15);
      }
      const circle = document.getElementById(activeId);
      circle.setAttribute('r', 30);
      prevId = e.target.id;
    }
    console.log(data);
  }

  // custom node
  const CustomPoint = ({ node }) => {
    CustomPoint.propTypes = {
      node: PropTypes.object,
    };

    return (
      <svg id="graph" width="100%" height="800px">
        <pattern
          id={`nodes.${node.data.theId}`}
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
          r={node.size}
          opacity="1"
          transform={`translate(${node.x}, ${node.y}) scale(1)`}
          onClick={(e) => handleClick(e, node)}
          className="medium"
          fill={`url(#nodes.${node.data.theId})`}
          stroke="lightblue"
          strokeWidth="0.1%"
        />
      </svg>
    );
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      maxWidth
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        overflow: 'scroll',
      }}
    >
      {!loadingNetwork && successHome && network && data ? (
        <div
          style={{
            height: '70vh',
            width: '100%',
          }}
        >
          <ResponsiveNetwork
            animate={false}
            data={data}
            nodeComponent={CustomPoint}
            centeringStrength={0.3}
            linkBlendMode="multiply"
            motionConfig="wobbly"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            linkDistance={function (e) {
              return e.distance;
            }}
            repulsivity={15}
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
            nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
            linkThickness={function (n) {
              return 2 + 1 * n.target.data.height;
            }}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
      <Alert severity="info">
        To stay updated with our road map or contribute in building the DAO,
        please visit our document page —
        <Link href="https://road-map-docs.pages.dev/"> check it out! </Link>
      </Alert>
      <Grid sx={{ width: '100%' }} />
      <AppBarBottom path="dao" />
    </Grid>
  );
};

export default DAO;

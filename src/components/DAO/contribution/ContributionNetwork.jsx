import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { ResponsiveNetwork } from '@nivo/network';
import { fetchFamilyNetworks } from '../../../redux/actions/main/daoAction';
import { prepareUrl } from '../../../utils/helpers';
import { FAMILY_NETWORK_RESET } from '../../../redux/constants/familyConstants';

let prevId = null;

const ContributionNetwork = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [clicked, setClicked] = useState(false);

  const familyNetwork = useSelector((state) => state.familyNetwork);
  const { network, loading: loadingNetwork, success: successHome } = familyNetwork;

  useEffect(() => {
    dispatch(fetchFamilyNetworks());
    return () => {
      dispatch({ type: FAMILY_NETWORK_RESET });
    };
  }, []);

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
        const img = prepareUrl(network[c].awakeAvatarUrl);
        const childNode = {
          id: `Node ${c + 1}`,
          height: 1,
          size: 25,
          color: 'rgb(97, 205, 187)',
          img,
          theId: network[c].id,
        };
        nodesList.nodes.push(childNode);

        // 3- create link from child to SAY
        link = {
          source: `Node 0`,
          target: `Node ${c + 1}`,
          distance: 120,
        };
        nodesList.links.push(link);
      }
      setData(nodesList);
      setClicked(true);
    }
  }, [network, clicked]);

  // handle circle click

  function handleClick(e, node) {
    if (node.id === 'Node 0') {
      return;
    }
    if (clicked) {
      return;
    }
    setClicked(true);
    const nodesList = data;
    const prevCircle = document.getElementById(prevId || e.target.id);

    // for child click
    if (!node.id.includes('.')) {
      // select element and increase 'r'
      const activeId = e.target.id;
      const theId = Number(node.id.replace(/^\D+/g, '')); // theId = 37

      const circle = document.getElementById(activeId);
      circle.setAttribute('r', 30);

      // delete links/nodes if already one child selected
      for (let l = 0; l < nodesList.links.length; l += 1) {
        if (nodesList.links[l].source !== `Node 0` || nodesList.links[l].target.includes('.')) {
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

      if (prevId === e.target.id) {
        prevCircle.setAttribute('r', 15);
        prevId = null;
        return;
      }
      prevId = e.target.id;

      // create new links
      for (let f = 0; f < network[theId - 1].family.currentMembers.length; f += 1) {
        // 4- create V-family nodes
        const theUser = network[theId - 1].family.currentMembers[f].user;
        const img = theUser.avatarUrl && prepareUrl(theUser.avatarUrl);
        const familyNode = {
          id: `Node ${theUser.id}.0`,
          height: 1,
          size: 6,
          color: 'rgb(232, 193, 160)',
          img: img || '/images/logo.png',
          theId: theUser.id * 10000, // multiple by a number to avoid child and user id conflict
          child: network[theId - 1],
        };
        // 5- create family and child link
        const link = {
          source: `Node ${theId}`,
          target: `Node ${theUser.id}.0`,
          distance: 18,
        };
        nodesList.links.push(link);
        nodesList.nodes.push(familyNode);
        setData(nodesList);
      }
      // 6 -click on the users
    } else {
      const theId = Number(node.id.replace(/^\D+/g, '')); // theId = 37
      console.log(node.data.child);
      console.log(theId);
    }
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
          <image x="0%" y="0%" width="512" height="512" xlinkHref={node.data.img} />
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
          strokeWidth="0%"
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
        // paddingLeft: 2,
        // paddingRight: 2,
        overflow: 'scroll',
        // height: 300,
      }}
    >
      {!loadingNetwork && successHome && network && data ? (
        <div
          style={{
            height: '60vh',
            width: '120%',
            // background: 'white',
          }}
        >
          <ResponsiveNetwork
            style={{ background: 'white' }}
            animate={false}
            data={data}
            nodeComponent={CustomPoint}
            centeringStrength={0.3}
            linkBlendMode="multiply"
            // motionConfig="wobbly"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            linkDistance={(e) => {
              return e.distance;
            }}
            repulsivity={15}
            nodeSize={(n) => {
              return n.size;
            }}
            activeNodeSize={(n) => {
              return 1.5 * n.size;
            }}
            nodeColor={(e) => {
              return e.color;
            }}
            nodeBorderWidth={1}
            nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
            linkThickness={(n) => {
              return 2 + 1 * n.target.data.height;
            }}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default ContributionNetwork;

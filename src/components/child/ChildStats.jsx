/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChildNeeds } from '../../actions/childAction';

export default function ChildStats({ theChild }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const childNeeds = useSelector((state) => state.childNeeds);
  const { theNeeds, success } = childNeeds;

  // fetch child needs
  useEffect(() => {
    if (!success) {
      dispatch(fetchChildNeeds(theChild.id));
    }
  }, [dispatch, success, theChild]);

  const categorizeNeeds = () => {
    const allNeeds = theNeeds.needs.sort((a, b) => {
      if (!a.isDone && !b.isDone) {
        // Sort needs by create date Ascending
        return new Date(a.created) - new Date(b.created);
      }
      // Sort done needs by done date Descending
      return new Date(b.doneAt) - new Date(a.doneAt);
    });
    const needData = [[], [], [], [], [], []];
    for (let i = 0; i < allNeeds.length; i++) {
      if (allNeeds[i].isDone) {
        needData[5].push(allNeeds[i]);
      } else if (allNeeds[i].isUrgent) {
        needData[0].push(allNeeds[i]);
      } else {
        needData[allNeeds[i].category + 1].push(allNeeds[i]);
      }
    }

    return needData;
  };

  const needsArray = categorizeNeeds();
  console.log(needsArray);

  const data = [
    {
      id: t('childData.needCategory.surroundings'),
      value: needsArray[5].length,
      color: 'hsl(287, 70%, 50%)',
    },
    {
      id: t('childData.needCategory.health'),
      value: needsArray[5].length,
      color: 'hsl(294, 70%, 50%)',
    },
    {
      id: t('childData.needCategory.joy'),
      value: needsArray[5].length,
      color: 'hsl(182, 70%, 50%)',
    },
    {
      id: t('childData.needCategory.growth'),
      value: needsArray[5].length,
      color: 'hsl(124, 70%, 50%)',
    },
    {
      id: t('childData.needCategory.urgent'),
      value: needsArray[5].length,
      color: 'hsl(41, 70%, 50%)',
    },
  ];
  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.35}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: t('childData.needCategory.surroundings'),
            },
            id: 'dots',
          },
          {
            match: {
              id: t('childData.needCategory.health'),
            },
            id: 'dots',
          },
          {
            match: {
              id: t('childData.needCategory.joy'),
            },
            id: 'dots',
          },
          {
            match: {
              id: t('childData.needCategory.growth'),
            },
            id: 'dots',
          },
          {
            match: {
              id: t('childData.needCategory.urgent'),
            },
            id: 'lines',
          },
        ]}
      />
    </div>
  );
}

ChildStats.propTypes = {
  theChild: PropTypes.object,
};

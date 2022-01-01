/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function ChildStats({ needsArray }) {
  const { t } = useTranslation();

  const [needsData, setNeedsData] = useState();
  const [pieData, setPieData] = useState();

  // urgent ==> index 0
  // growth 0 ==> index 1
  // joy 1 ==> index 2
  // health 2 ==> index 3
  // surroundings 3 ==> index 4
  useEffect(() => {
    const needData = [[], [], [], [], [], []];
    for (let i = 0; i < needsArray[5].length; i += 1) {
      if (needsArray[5][i].isUrgent) {
        needData[0].push(needsArray[5][i]);
      } else {
        needData[needsArray[5][i].category + 1].push(needsArray[5][i]);
      }
    }
    setNeedsData(needData);
  }, [needsArray]);

  console.log(needsData);

  useEffect(() => {
    if (needsData) {
      setPieData([
        {
          id: t('childData.needCategory.surroundings'),
          value: needsData[4].length,
          color: 'hsl(287, 70%, 50%)',
        },
        {
          id: t('childData.needCategory.health'),
          value: needsData[3].length,
          color: 'hsl(294, 70%, 50%)',
        },
        {
          id: t('childData.needCategory.joy'),
          value: needsData[2].length,
          color: 'hsl(182, 70%, 50%)',
        },
        {
          id: t('childData.needCategory.growth'),
          value: needsData[1].length,
          color: 'hsl(124, 70%, 50%)',
        },
        {
          id: t('childData.needCategory.urgent'),
          value: needsData[0].length,
          color: 'hsl(41, 70%, 50%)',
        },
      ]);
    }
  }, [needsData]);

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsivePie
        data={pieData}
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
  needsArray: PropTypes.array.isRequired,
};

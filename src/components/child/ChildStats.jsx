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

  useEffect(() => {
    if (needsData) {
      setPieData([
        {
          id: t('childData.needCategory.growth'),
          label: t('childData.needCategory.growth'),
          value: needsData[1].length,
        },
        {
          id: t('childData.needCategory.joy'),
          label: t('childData.needCategory.joy'),
          value: needsData[2].length,
        },
        {
          id: t('childData.needCategory.health'),
          label: t('childData.needCategory.health'),
          value: needsData[3].length,
        },
        {
          id: t('childData.needCategory.surroundings'),
          label: t('childData.needCategory.surroundings'),
          value: needsData[4].length,
        },
      ]);
    }
  }, [needsData]);

  return (
    <div style={{ height: '300px', width: '100%', direction: 'ltr' }}>
      <ResponsivePie
        data={pieData}
        margin={{ top: 40, right: 50, bottom: 80, left: 50 }}
        innerRadius={0.35}
        padAngle={1.7}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLinkLabelsDiagonalLength={15} // label line
        arcLinkLabelsStraightLength={5} // label line
        arcLinkLabelsTextOffset={5} // offset text from line
        arcLinkLabelsThickness={1}
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
              id: t('childData.needCategory.growth'),
            },
            id: 'dots',
          },
          {
            match: {
              id: t('childData.needCategory.joy'),
            },
            id: 'dotes',
          },
          {
            match: {
              id: t('childData.needCategory.health'),
            },
            id: 'lines',
          },
          {
            match: {
              id: t('childData.needCategory.surroundings'),
            },
            id: 'dots',
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 5,
            itemWidth: 60,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

ChildStats.propTypes = {
  needsArray: PropTypes.array.isRequired,
};

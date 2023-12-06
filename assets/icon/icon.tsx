import { iconName, IconSet } from './constants';

interface IconProps {
  icon: iconName;
  size: number;
  color?: string;
}

const Icon = ({ icon, size, color }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={IconSet[icon].viewBox}
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule={IconSet[icon].fillRule1 || 'nonzero'}
        d={IconSet[icon].path1}
      />
      {IconSet[icon].path2 && (
        <path
          fillRule={IconSet[icon].fillRule2 || 'nonzero'}
          d={IconSet[icon].path2}
        />
      )}
      {IconSet[icon].path3 && (
        <path
          fillRule={IconSet[icon].fillRule3 || 'nonzero'}
          d={IconSet[icon].path3}
        />
      )}
    </svg>
  );
};
export default Icon;

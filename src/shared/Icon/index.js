import _ from "lodash";
import * as icons from "./Icon";

const Icon = _.mapValues(icons, (SvgIcon) => {
  return ({ svgProps, ...restProps }) => <SvgIcon {...restProps} />;
});

export default Icon;

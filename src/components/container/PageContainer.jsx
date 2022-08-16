/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet';

const PageContainer = ({ title, description, children }) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default PageContainer;

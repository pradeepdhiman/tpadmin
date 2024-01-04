import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ListItem({ item }) {
  const dummyItem = {
    courseID: item.courseID,
    completionDate: item.completionDate,
    amountPaid: item.amountPaid,
    status: item.status,
    remarks: item.remarks,
  };

  const styles = {
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "top",
      py: 1,
      pr: 1,
      mb: 1,
    },
    softBox: {
      lineHeight: 1,
    },
  };

  return (
    <SoftBox component="li" {...styles.listItem}>
      {Object.entries(dummyItem).map(([key, value]) => (
        <SoftBox lineHeight={1} key={`${key}-item`} {...styles.softBox}>
          <SoftTypography display="block" variant="button" fontWeight="medium" fontSize="12px">
            {key.toUpperCase()}
          </SoftTypography>
          <SoftTypography variant="caption" fontWeight="bold" color="text">
            {value}
          </SoftTypography>
        </SoftBox>
      ))}
    </SoftBox>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    courseID: PropTypes.number.isRequired,
    completionDate: PropTypes.string.isRequired,
    amountPaid: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    remarks: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListItem;

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { User } from "../../../../utils/queries";
import Auth from "../../../../utils/auth";
import TestItem1 from "../../../../assets/images/bag.jpg";
import { Rating } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

// Modal for each wishlist item
export default function WishImglist() {
  const [openModals, setOpenModals] = useState([]);

  const handleOpenModal = (index) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = true;
    setOpenModals(newOpenModals);
  };

  const handleCloseModal = (index) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = false;
    setOpenModals(newOpenModals);
  };

  const id = Auth.getProfile().data._id;
  const [loadUser, { loading, data, error }] = useLazyQuery(User, {
    variables: { userId: id },
  });

  // Run loadUser 1x when component renders - re-run loadUser if it changes
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error fetching data</p>;
  }
  if (loading) {
    return <p>Loading...</p>; // Replace with loading spinner
  }
  if (!data || !data.user) {
    return <p>No user data found</p>;
  }

  // Grab data
  const user = data.user;

  return (
    <Box>
      <ImageList sx={{}}>
        {user.wishlist.map((item, index) => (
          <ImageListItem key={item.id}>
            <Button onClick={() => handleOpenModal(index)}>
              <img
                srcSet={`${TestItem1}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${TestItem1}?w=248&fit=crop&auto=format`}
                alt={item.item.name}
                loading="lazy"
                style={{ width: "100px", height: "auto" }}
              />
            </Button>
            <ImageListItemBar
              title={item.item.name}
              subtitle={item.item.price}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
            <Modal
              open={openModals[index] || false}
              onClose={() => handleCloseModal(index)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img
                  srcSet={`${TestItem1}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${TestItem1}?w=248&fit=crop&auto=format`}
                  alt={item.item.name}
                  loading="lazy"
                  style={{ width: "100px", height: "auto" }}
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {item.item.name}
                </Typography>
                <Typography
                  id="item-price"
                  sx={{ mt: 2 }}
                >
                  {item.item.price}
                </Typography>
                <Typography
                variant="caption"
                  id="item-price"
                  sx={{ mt: 2 }}
                >
                  "{item.item.descroption}"
                </Typography>
              </Box>
            </Modal>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
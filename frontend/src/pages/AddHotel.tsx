import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </>
  );
};

export default AddHotel;

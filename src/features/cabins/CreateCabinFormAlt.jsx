import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addCabin, addCabins } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const CreateCabinFormAlt = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: isCreating,
    mutate,
    mutateAsync,
  } = useMutation({
    mutationFn: (newCabin) => addCabins(newCabin),
    onSuccess: () => {
      toast.success("New Cabin Successfully Added");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error("Cabin cannot be added"),
  });

  const [image, setImage] = useState(null);
  const [otherFields, setOtherFields] = useState({
    id: "",
    name: "",
    maxCapacity: "",
    regularPrice: "",
    discount: "",
    description: "",
  });

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleFieldChange = (event) => {
    setOtherFields({
      ...otherFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    Object.keys(otherFields).forEach((key) => {
      formData.append(key, otherFields[key]);
    });

    mutate(formData); // Use mutate from useMutation to trigger the API call
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleFieldChange}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="text"
          id="maxCapacity"
          name="maxCapacity"
          placeholder="Max Capacity"
          onChange={handleFieldChange}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="text"
          id="regularPrice"
          name="regularPrice"
          placeholder="Regular Price"
          onChange={handleFieldChange}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="text"
          id="discount"
          name="discount"
          placeholder="Discount"
          onChange={handleFieldChange}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          onChange={handleFieldChange}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="image">Cabin photo</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">Edit cabin</Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinFormAlt;

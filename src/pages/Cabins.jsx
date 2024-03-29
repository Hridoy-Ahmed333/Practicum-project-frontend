import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
//import CreateCabinFormAlt from "../features/cabins/CreateCabinFormalt";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm(!showForm)}>
          {!showForm ? "Add new Cabin" : "Close The Tab"}
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;

//<img src={`src/data/images/${pic?.image}`} alt="jos" />

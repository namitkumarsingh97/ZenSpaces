import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  IconButton,
} from '@material-tailwind/react';
import { IoClose } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa6';
import { BASE_URL } from '@/utils/apiClient';

export function DeletePopUp() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <FaTrash size="20px" className="cursor-pointer" onClick={handleOpen} />
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <section>
          <div className="w-full px-4">
            <div className="grid h-screen top-0 place-items-center">
              <Card className="max-w-xl">
                <CardBody>
                  <div className="flex w-full justify-end">
                    <IconButton variant="text" size="lg">
                      <IoClose
                        className="h-10 w-10"
                        onClick={() => handleOpen()}
                      />
                    </IconButton>
                  </div>
                  <div className="text-center ">
                    <Typography
                      color="blue-gray"
                      className="mb-10 font-mulish mt-5"
                      variant="h4"
                    >
                      Are you sure that you want to delete this site?
                    </Typography>
                    <div className="flex flex-col mt-8 md:flex-row justify-center items-center gap-5">
                      <Button
                        type="sucess"
                        className=" bg-green-500 font-mulish"
                        onClick={() => handleOpen()}
                      >
                        Yes
                      </Button>
                      <Button
                        className=" bg-red-500 font-mulish"
                        onClick={() => handleOpen()}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </Dialog>
    </>
  );
}

export function DeletePopUp1({ courseId, onDeleteSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(null); // To handle errors

  const handleOpen = () => setOpen((cur) => !cur);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/delete-course/${courseId}`,
      );

      if (response.status === 200) {
        // alert("Course deleted successfully!");
        onDeleteSuccess(courseId);
        handleOpen();
      }
    } catch (error) {
      // setError("Failed to delete course. Please try again.");
      console.error('Error deleting course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FaTrash size="20px" className="cursor-pointer" onClick={handleOpen} />
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <section>
          <div className="w-full px-4">
            <div className="grid h-screen top-0 place-items-center">
              <Card className="max-w-xl">
                <CardBody>
                  <div className="flex w-full justify-end">
                    <IconButton variant="text" size="lg">
                      <IoClose
                        className="h-10 w-10"
                        onClick={() => handleOpen()}
                      />
                    </IconButton>
                  </div>
                  <div className="text-center ">
                    <Typography
                      color="blue-gray"
                      className="mb-10 font-mulish mt-5"
                      variant="h4"
                    >
                      Are you sure that you want to delete this course?
                    </Typography>
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="flex flex-col mt-8 md:flex-row justify-center items-center gap-5">
                      <Button
                        className="bg-green-500 font-mulish"
                        onClick={handleDelete}
                        disabled={loading}
                      >
                        {loading ? 'Deleting...' : 'Yes'}
                      </Button>
                      <Button
                        className="bg-red-500 font-mulish"
                        onClick={() => handleOpen()}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </Dialog>
    </>
  );
}

export function DeletePopUp3() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <FaTrash size="20px" className="cursor-pointer" onClick={handleOpen} />
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <section>
          <div className="w-full px-4">
            <div className="grid h-screen top-0 place-items-center">
              <Card className="max-w-xl">
                <CardBody>
                  <div className="flex w-full justify-end">
                    <IconButton variant="text" size="lg">
                      <IoClose
                        className="h-10 w-10"
                        onClick={() => handleOpen()}
                      />
                    </IconButton>
                  </div>
                  <div className="text-center ">
                    <Typography
                      color="blue-gray"
                      className="mb-10 font-mulish mt-5"
                      variant="h4"
                    >
                      Are you sure that you want to delete this customer?
                    </Typography>
                    <div className="flex flex-col mt-8 md:flex-row justify-center items-center gap-5">
                      <Button
                        type="sucess"
                        className=" bg-green-500 font-mulish"
                        onClick={() => handleOpen()}
                      >
                        Yes
                      </Button>
                      <Button
                        className=" bg-red-500 font-mulish"
                        onClick={() => handleOpen()}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </Dialog>
    </>
  );
}

import { Card, Form, Input, Button, notification } from "antd";
import axios from "axios";
import React, { FC } from "react";

interface valueInterface {
  title: string;
}

interface CreatePorps {
  refetch: any;
}

const CreatePost: FC<CreatePorps> = ({ refetch }) => {
  const [form] = Form.useForm();
  const onFinish = async (values: valueInterface) => {
    try {
      console.log(values);
      const { data } = await axios.post("http://localhost:4000/posts", values);
      notification.success({
        message: "Crate Success",
        description: JSON.stringify(data, null, 2),
      });
      refetch();
      form.resetFields();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Crate falie",
        description: JSON.stringify(error, null, 2),
      });
    }
  };
  return (
    <Card style={{ borderRadius: "0.5rem" }}>
      <h3>
        <strong>Create Post</strong>
      </h3>
      <Form form={form} name="create post" onFinish={onFinish}>
        <Form.Item name="title">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreatePost;

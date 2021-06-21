import React, { FC } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useCommentsContext } from "../../contextHooks/CommentsContext";

interface CreateCommentInterface {
  postId: string;
  refetch: () => void;
}
const CreateComment: FC<CreateCommentInterface> = ({ postId, refetch }) => {
  const { createComment } = useCommentsContext();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    await createComment(postId, values);
    form.resetFields();
    refetch();
  };
  return (
    <Form form={form} onFinish={handleSubmit} name="create comment">
      <Row>
        <Col>
          <Form.Item noStyle name="content">
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item noStyle>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateComment;

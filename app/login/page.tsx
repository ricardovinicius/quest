import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";

const LoginPage = () => {
  return (
    <div className="container mx-auto max-w-sm">
      <Card>
        <CardHeader className="justify-center py-4">
          <h1 className="">Login</h1>
        </CardHeader>
        <Divider />
        <CardBody className="p-5 py-8 gap-4">
          <Input label="Email" placeholder="Enter your email" type="email" />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <Button>Login</Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginPage

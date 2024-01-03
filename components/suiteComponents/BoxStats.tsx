import Container from "../Container"
import { Card } from "../ui/card"

const BoxStats = () => {
  return (
    <Container className="min-w-full rouned-md p-4 mt-4 flex flex-row">
        <Card className="w-56 h-40 flex items-center justify-center mx-6">
            status
        </Card>
        <Card className="w-56 h-40 flex items-center justify-center mx-6">
            failures
        </Card>
        <Card className="w-56 h-40 flex items-center justify-center mx-6">
            flaky
        </Card>
        <Card className="w-56 h-40 flex items-center justify-center mx-6">
            timeouts
        </Card>
    </Container>
  )
}

export default BoxStats
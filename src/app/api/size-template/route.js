import connectDB from "@/utils/connectDB";
import SizeTemplate from "@/models/sizeTemplate";
connectDB(); // Database Connection 
export async function GET(request) {  // GET 
  try {
    const listSizeTemplate = await SizeTemplate.find();
    return Response.json(listSizeTemplate, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) { // POST 
  try {
    const res = await request.json();
    const newSizeTemplate = new SizeTemplate(res);
    const savedSizeTemplate = await newSizeTemplate.save();
    return Response.json(savedSizeTemplate, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    const res = await request.json();
    const {id,category,sizeList}=res;
    const updateSizeTemplate = await SizeTemplate.findByIdAndUpdate(id,{category,sizeList})
    const savedSizeTemplate = await updateSizeTemplate.save();
    return Response.json(savedSizeTemplate, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function DELETE(request) {
  try {
    const res = await request.json();
    const { id } = res;
    console.log(id);
    const listSizeTemplate = await SizeTemplate.findByIdAndDelete(id);
    return Response.json(listSizeTemplate, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

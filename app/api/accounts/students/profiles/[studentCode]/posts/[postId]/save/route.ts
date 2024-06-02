import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { studentCode: string; postId: string } }
) {
  try {
    const profile = await db.profile.findFirst({
      where: {
        student: {
          studentCode: params.studentCode,
        },
      },
    });

    if (!profile) {
      return { error: "Không tìm thấy trang cá nhân" };
    }

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
        isArchived: false,
      },
    });

    if (!post) {
      return { error: "không tìm thấy bài viết" };
    }

    const save = await db.postSave.findUnique({
      where: {
        profileId_postId: {
          profileId: profile.id,
          postId: post.id,
        },
      },
    });

    if (save) {
      await db.postSave.delete({
        where: {
          id: save.id,
        },
      });
      return { success: "Bỏ lưu thành công" };
    }

    await db.postSave.create({
      data: {
        postId: post.id,
        profileId: profile.id,
      },
    });
    return { success: "Lưu bài viết thành công" };
  } catch (error) {
    return { error: "Lưu bài viết thất bại " };
  }
}

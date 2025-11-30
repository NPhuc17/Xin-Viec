import Cookies from "js-cookie";
import { variables } from "../variables";

export async function uploadHoSo(formData, editingId = null) {
  const token = Cookies.get("jwt_token");
  const url = editingId
    ? `${variables.API_URL}HoSo/update/${editingId}`
    : `${variables.API_URL}HoSo/create`;

  const method = editingId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

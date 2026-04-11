const axios = require("axios");

const ROOM_LIST = [
  { id: 86, name: "Teras Priangan: Outdoor Class" },
  { id: 80, name: "Teras Priangan: Pendopo Priangan" },
  { id: 14, name: "Teras Priangan: Joglo" },
  { id: 74, name: "GSG: Sayap Kanan Lantai 3" },
  { id: 66, name: "GSG: VIP C" },
  { id: 61, name: "GSG: Sayap Kiri Lantai 3" },
  { id: 3, name: "GSG: VIP B" },
  { id: 2, name: "GSG: VIP A" },
  { id: 1, name: "GSG: Aula Besar Lt. 1" },
];

const getEvents = async (baseUrl, roomId, date) => {
  try {
    const start = `${date}T00:00:00`;
    const end = `${date}T23:59:59`;

    const url = `${baseUrl}?rid=${roomId}&start=${start}&end=${end}`;

    const { data } = await axios.get(url);

    const eventsArray = Array.isArray(data) ? data : [];

    const formatted = eventsArray.map((event) => {
      const startTime = new Date(event.start);
      const endTime = new Date(event.end);

      return {
        id: event.id,
        peminjam: event.name.trim(),
        acara: event.acara,
        start: event.start,
        end: event.end,
        durasi_menit: (endTime - startTime) / (1000 * 60),
      };
    });

    return {
      room_id: roomId,
      date,
      total_event: formatted.length,
      events: formatted,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};

const getAllRoomsAvailability = async (baseUrl, date) => {
  const results = await Promise.all(
    ROOM_LIST.map(async (room) => {
      const result = await getEvents(baseUrl, room.id, date);

      return {
        room_id: room.id,
        room_name: room.name,
        total_event: result.total_event || 0,
        is_available: (result.total_event || 0) === 0,
        events: result.events || []
      };
    })
  );

  return {
    date,
    total_room: ROOM_LIST.length,
    rooms: results,
  };
};

const getRangeAvailability = async (baseUrl, roomId, startDate, endDate) => {
  try {
    const start = `${startDate}T00:00:00`;
    const end = `${endDate}T23:59:59`;

    const url = `${baseUrl}?rid=${roomId}&start=${start}&end=${end}`;

    const { data } = await axios.get(url);

    const eventsArray = Array.isArray(data) ? data : [];

    // 🔥 group by tanggal
    const grouped = {};

    eventsArray.forEach(ev => {
      const date = ev.start.split(" ")[0];

      if (!grouped[date]) grouped[date] = [];

      const startTime = new Date(ev.start);
      const endTime = new Date(ev.end);

      grouped[date].push({
        acara: ev.acara,
        start: startTime.toTimeString().slice(0, 5),
        end: endTime.toTimeString().slice(0, 5),
      });
    });

    return grouped;

  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getAllRoomsRange = async (baseUrl, startDate, endDate) => {
  const results = await Promise.all(
    ROOM_LIST.map(async (room) => {
      const grouped = await getRangeAvailability(
        baseUrl,
        room.id,
        startDate,
        endDate
      );

      return {
        room_id: room.id,
        room_name: room.name,
        availability: grouped
      };
    })
  );

  return {
    start: startDate,
    end: endDate,
    rooms: results
  };
};

module.exports = {
  getEvents,
  getAllRoomsAvailability,
  getRangeAvailability,
  getAllRoomsRange,
};
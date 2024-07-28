import prisma from "../db";

export const getUpdates = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { belongsToId: req.user.id },
      include: { updates: true },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    res.json({ data: updates });
  } catch (err) {
    next(err);
  }
};

export const getUpdateById = async (req, res, next) => {
  try {
    const update = await prisma.update.findFirst({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: update });
  } catch (err) {
    next(err);
  }
};

export const createUpdate = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.body.productId },
    });

    // does not belong to user
    if (!product) return res.json({ message: "nope" });

    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        product: { connect: { id: product.id } },
      },
    });
    res.json({ data: update });
  } catch (err) {
    next(err);
  }
};

export const updateUpdate = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });
    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);
    if (!match) return res.json({ message: "nope" });

    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    res.json({ data: updatedUpdate });
  } catch (err) {
    next(err);
  }
};

export const deleteUpdate = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });
    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);
    if (!match) return res.json({ message: "nope" });
    const deleted = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: deleted });
  } catch (err) {
    next(err);
  }
};

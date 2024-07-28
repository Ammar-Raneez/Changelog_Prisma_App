import prisma from "../db";

export const getProducts = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true
      }
    });

    res.json({ data: user.products });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        }
      }
    });

    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      }
    });

    res.json({ data: product });
  } catch (err) {
    next(err);
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        }
      },
      data: {
        name: req.body.name
      }
    });

    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        }
      }
    });

    res.json({ data: deleted });
  } catch (err) {
    next(err);
  }
};

